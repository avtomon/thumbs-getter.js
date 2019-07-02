"use strict";
import { Utils } from "../../../good-funcs.js/dist/js/GoodFuncs.js";
export var ImageGenerator;
(function (ImageGenerator) {
    /**
     * Получение превью из картинки, видео или PDF
     */
    class ThumbsGetter {
        /**
         * Вычисление размеров изображения
         *
         * @param {IThumbsSettings} settings - настройки
         *
         * @returns {Dimensions}
         */
        static getDimensions(settings) {
            let elementHeight = this.height || this.videoHeight, elementWidth = this.width || this.videoWidth;
            if (!settings.maxHeight) {
                settings.maxHeight = elementHeight;
            }
            if (!settings.maxWidth) {
                settings.maxWidth = elementWidth;
            }
            let newHeight, newWidth;
            if (this.height > this.width) {
                newHeight = settings.maxHeight;
                newWidth = elementWidth * newHeight / elementHeight;
            }
            else {
                newWidth = settings.maxWidth;
                newHeight = elementHeight * newWidth / elementWidth;
            }
            return {
                height: newHeight,
                width: newWidth
            };
        }
        /**
         * Формирование изображения из загруженной картинки
         *
         * @param {File} file - загруженный файл
         * @param {HTMLImageElement} image - в какой элемент подгружаем изображение
         * @param {ImageToBlobCallback} toBlobCallback - обработчик генерации блоба из загруженного файла
         * @param {IThumbsSettings} settings - настройки
         *
         * @returns {HTMLCanvasElement | null}
         */
        static handleImageSelect(file, image, toBlobCallback, settings = {
            maxHeight: 100,
            maxWidth: 100,
            imageQuality: 0.9
        }) {
            let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), URL = window.URL || window['webkitURL'], imgLoadHandler = function () {
                let { width: newWidth, height: newHeight } = ThumbsGetter.getDimensions.call(this, settings);
                canvas.width = newWidth;
                canvas.height = newHeight;
                canvas.style.display = 'block';
                ctx.drawImage(this, 0, 0, newWidth, newHeight);
                canvas.toBlob(toBlobCallback, 'image/jpeg', settings.imageQuality);
                URL.revokeObjectURL(this.src);
            };
            if (!URL) {
                return null;
            }
            image.onload = imgLoadHandler;
            image.src = URL.createObjectURL(file);
            return canvas;
        }
        /**
         * Формирование видео из загруженного файла
         *
         * @param {File} file - загруженный файл
         * @param {HTMLVideoElement} video - в какой элемент подгружаем видео
         * @param {VideoToBlobCallback} toBlobCallback - обработчик генерации блоба из загруженного файла
         * @param {IThumbsSettings} settings - настройки
         *
         * @returns {HTMLCanvasElement | null}
         */
        static handleVideoSelect(file, video, toBlobCallback, settings = {
            imageQuality: 0.9
        }) {
            let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), URL = window.URL || window['webkitURL'], videoLoadHandler = function () {
                let { width: newWidth, height: newHeight } = ThumbsGetter.getDimensions.call(this, settings);
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(this, 0, 0, newWidth, newHeight);
                canvas.toBlob(function (blob) {
                    video.currentTime = 0;
                    toBlobCallback(blob, canvas, video, file);
                }, 'image/jpeg', settings.imageQuality);
            };
            if (!URL) {
                return null;
            }
            video.src = URL.createObjectURL(file);
            video.currentTime = 5;
            video.onloadeddata = videoLoadHandler;
            return canvas;
        }
        /**
         * Формирование PDF из загруженного файла
         *
         * @param {File} file - загруженный файл
         * @param {HTMLIFrameElement} iframe - в какой элемент подгружаем PDF
         * @param {PDFToBlobCallback} toBlobCallback - обработчик генерации блоба из загруженного файла
         * @param {IThumbsSettings} settings - настройки
         *
         * @returns {HTMLCanvasElement | null}
         */
        static async handlePdfSelect(file, iframe, toBlobCallback, settings = {
            imageQuality: 0.9
        }) {
            let canvas = document.createElement('canvas'), URL = window.URL || window['webkitURL'];
            if (!URL) {
                return null;
            }
            let iframeUrl = URL.createObjectURL(file);
            iframe.src = iframeUrl;
            await Promise.all(Utils.GoodFuncs.getScripts(['/vendor/bower-asset/pdfjs-dist/build/pdf.js']));
            pdfjsLib.getDocument(iframeUrl)
                .then(function (pdf) {
                pdf.getPage(1).then(function (page) {
                    let viewport = page.getViewport(1);
                    let { width: newWidth, height: newHeight } = ThumbsGetter.getDimensions.call(viewport, settings);
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    let renderContext = {
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
    ImageGenerator.ThumbsGetter = ThumbsGetter;
})(ImageGenerator || (ImageGenerator = {}));
