"use strict";

let thumbGetter = {
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
                toBlobCallback(blob, canvas, video);
            }, 'image/jpeg', settings.imageQuality);
        };

        if (!URL) {
            return false;
        }

        let videoUrl = URL.createObjectURL(file);
        video.src = videoUrl;
        video.currentTime = 10;

        return canvas;
    },

    handleDocumentSelect: function(file, element, toBlobCallback, settings = {imageQuality: 0.9})
    {
        let doc = element.get(0),
            canvas = document.createElement('canvas'),
            URL = window.URL || window.webkitURL;

        doc.onloadeddata = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);

            canvas.toBlob(function (blob) {
                toBlobCallback(blob, canvas, video);
            }, 'image/jpeg', settings.imageQuality);
        };

        if (!URL) {
            return false;
        }

        let docUrl = URL.createObjectURL(file);
        doc.src = docUrl;
        doc.currentTime = 10;

        return canvas;
    }
}