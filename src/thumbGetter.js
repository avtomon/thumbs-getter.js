"use strict";

let thumbGetter = {
    handleFileSelect: function(e, element, saveTo, settings = {maxHeight: 100, maxWidth: 100, imageQuality: 0.9})
    {
        let canvas = element.nextAll('canvas');
        if (canvas.lenght) {
            canvas = canvas[0];
        } else {
            canvas = document.createElement('canvas');
        }

        let image = new Image(),
            ctx = canvas.getContext('2d'),
            file = e.target.files[0],
            URL = window.URL || window.webkitURL,
            imgLoadHandler = function () {
                let newWidth, newHeight;

                if (this.height > this.width) {
                    newHeight = settings.maxHeight;
                    newWidth = image.width * newHeight / image.height;
                } else {
                    newWidth = settings.maxWidth;
                    newHeight = image.height * newWidth / image.width;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;
                canvas.style.display = 'block';

                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                canvas.toBlob(function (blob) {
                    saveTo.push({thumb: blob});
                }, 'image/jpeg', settings.imageQuality)

                URL.revokeObjectURL(image.src);
            };

        if (!URL) {
            return false;
        }

        let imageUrl = URL.createObjectURL(file);
        element.attr('src', imageUrl);
        image.src = imageUrl;

        image.onload = imgLoadHandler;

        return canvas;
    }
}