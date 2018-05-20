"use strict";

let thumbGetter = {
    /**
     * Формирование изображения из загруженного файла
     *
     * @param file - загруженный файл
     * @param element - в какой элемент подгружаем изображение
     * @param toBlobCallback - обработчик генерации блоба из загруженного файла
     * @param settings - настройки
     *
     * @returns {*}
     */
    handleImageSelect: function(file, element, toBlobCallback, settings = {maxHeight: 100, maxWidth: 100, imageQuality: 0.9})
    {
        let canvas = document.createElement('canvas'),
            image = new Image(),
            ctx = canvas.getContext('2d'),
            URL = window.URL || window.webkitURL,
            imgLoadHandler = function () {
                let newWidth, newHeight;

                if (this.height > this.width) {
                    newHeight = settings.maxHeight;
                    newWidth = this.width * newHeight / this.height;
                } else {
                    newWidth = settings.maxWidth;
                    newHeight = this.height * newWidth / this.width;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;
                canvas.style.display = 'block';

                ctx.drawImage(this, 0, 0, newWidth, newHeight);

                canvas.toBlob(toBlobCallback, 'image/jpeg', settings.imageQuality)

                URL.revokeObjectURL(this.src);
            };

        if (!URL) {
            return false;
        }

        let imageUrl = URL.createObjectURL(file);
        element.get(0).src = imageUrl;
        image.src = imageUrl;

        image.onload = imgLoadHandler;

        return canvas;
    },

    /**
     * Формирование видео из загруженного файла
     *
     * @param file - загруженный файл
     * @param element - в какой элемент подгружаем видео
     * @param toBlobCallback - обработчик генерации блоба из загруженного файла
     * @param settings - настройки
     *
     * @returns {*}
     */
    handleVideoSelect: function(file, element, toBlobCallback, settings = {imageQuality: 0.9})
    {
        let video = element.get(0),
            canvas = document.createElement('canvas'),
            URL = window.URL || window.webkitURL;

        video.onloadeddata = function() {
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            canvas.getContext('2d').drawImage(this, 0, 0, this.videoWidth, this.videoHeight);

            canvas.toBlob(function (blob) {
                video.currentTime = 0;
                toBlobCallback(blob, canvas, video);
            }, 'image/jpeg', settings.imageQuality);
        };

        if (!URL) {
            return false;
        }

        let videoUrl = URL.createObjectURL(file);
        video.src = videoUrl;
        video.currentTime = 5;

        return canvas;
    },

    /**
     *
     *
     * Формирование PDF из загруженного файла
     *
     * @param file - загруженный файл
     * @param element - в какой элемент подгружаем PDF
     * @param toBlobCallback - обработчик генерации блоба из загруженного файла
     * @param settings - настройки
     *
     * @returns {*}
     */
    handlePdfSelect: function(file, element, toBlobCallback, settings = {imageQuality: 0.9})
    {
        let iframe = element.get(0),
            canvas = document.createElement('canvas'),
            URL = window.URL || window.webkitURL;

        if (!URL) {
            return false;
        }

        let iframeUrl = URL.createObjectURL(file);
        iframe.src = iframeUrl;

        if (typeof pdfjsDistBuildPdf === "undefined") {
            $.getScriptSync('/vendor/avtomon/pdf.js/build/dist/build/pdf.min.js')
        }

        window.PDFJS = pdfjsDistBuildPdf;

        PDFJS.getDocument(iframeUrl)
            .then(function(pdf) {
                pdf.getPage(1).then(function(page) {
                    let viewport = page.getViewport(1);

                    canvas.height = viewport.height < viewport.width ? viewport.height : viewport.width;
                    canvas.width = viewport.width;

                    var renderContext = {
                        canvasContext: canvas.getContext('2d'),
                        viewport: viewport
                    };

                    page.render(renderContext).then(function () {
                        canvas.toBlob(function (blob) {
                            toBlobCallback(blob, canvas, iframe);
                        }, 'image/jpeg', settings.imageQuality);
                    });
                });
            });

        return canvas;
    }
}