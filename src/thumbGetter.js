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
                    newWidth = image.width * newHeight / image.height;
                } else {
                    newWidth = settings.maxWidth;
                    newHeight = image.height * newWidth / image.width;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;
                canvas.style.display = 'block';

                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                canvas.toBlob(toBlobCallback, 'image/jpeg', settings.imageQuality)

                URL.revokeObjectURL(image.src);
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
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

            canvas.toBlob(toBlobCallback, 'image/jpeg', settings.imageQuality);
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

        video.onloadeddata = function() {
            canvas.width = doc.width;
            canvas.height = doc.height;
            canvas.getContext('2d').drawImage(video, 0, 0, doc.width, doc.height);

            canvas.toBlob(toBlobCallback, 'image/jpeg', settings.imageQuality);
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