"use strict";

let thumbGetter = {
    handleFileSelect: function(e, element, maxHeight = 100, maxWidth = 100, imageQuality = 0.9)
    {
        let image = new Image(),
            canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            thumb,
            file = e.target.files[0],
            URL = window.URL || window.webkitURL,
            imgLoadHandler = function () {
                let newWidth, newHeight;

                if (this.height > this.width) {
                    newHeight = maxHeight;
                    newWidth = image.width * newHeight / image.height;
                } else {
                    newWidth = maxWidth;
                    newHeight = image.height * newWidth / image.width;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                canvas.toBlob(function (blob) {
                    thumb = blob;
                }, 'image/jpeg', imageQuality)

                URL.revokeObjectURL(image.src);
            };

        if (!URL) {
            return false;
        }

        let imageUrl = URL.createObjectURL(file);
        element.src = imageUrl;
        image.src = imageUrl;

        image.onload = imgLoadHandler;

        return {canvas: canvas, thumb: thumb};
    }
}