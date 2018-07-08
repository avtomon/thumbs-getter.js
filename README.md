<a name="ThumbsGetter"></a>

## ThumbsGetter
Получение превью из картинки, видео или PDF

**Kind**: global class  

* [ThumbsGetter](#ThumbsGetter)
    * [.getDimensions(settings)](#ThumbsGetter.getDimensions) ⇒ <code>Dimensions</code>
    * [.handleImageSelect(file, image, toBlobCallback, settings)](#ThumbsGetter.handleImageSelect) ⇒ <code>HTMLCanvasElement</code> \| <code>null</code>
    * [.handleVideoSelect(file, video, toBlobCallback, settings)](#ThumbsGetter.handleVideoSelect) ⇒ <code>HTMLCanvasElement</code> \| <code>null</code>
    * [.handlePdfSelect(file, iframe, toBlobCallback, settings)](#ThumbsGetter.handlePdfSelect) ⇒ <code>HTMLCanvasElement</code> \| <code>null</code>

<a name="ThumbsGetter.getDimensions"></a>

### ThumbsGetter.getDimensions(settings) ⇒ <code>Dimensions</code>
Вычисление размеров изображения

**Kind**: static method of [<code>ThumbsGetter</code>](#ThumbsGetter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>IThumbsSettings</code> | настройки |

<a name="ThumbsGetter.handleImageSelect"></a>

### ThumbsGetter.handleImageSelect(file, image, toBlobCallback, settings) ⇒ <code>HTMLCanvasElement</code> \| <code>null</code>
Формирование изображения из загруженной картинки

**Kind**: static method of [<code>ThumbsGetter</code>](#ThumbsGetter)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | загруженный файл |
| image | <code>HTMLImageElement</code> | в какой элемент подгружаем изображение |
| toBlobCallback | <code>ImageToBlobCallback</code> | обработчик генерации блоба из загруженного файла |
| settings | <code>IThumbsSettings</code> | настройки |

<a name="ThumbsGetter.handleVideoSelect"></a>

### ThumbsGetter.handleVideoSelect(file, video, toBlobCallback, settings) ⇒ <code>HTMLCanvasElement</code> \| <code>null</code>
Формирование видео из загруженного файла

**Kind**: static method of [<code>ThumbsGetter</code>](#ThumbsGetter)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | загруженный файл |
| video | <code>HTMLVideoElement</code> | в какой элемент подгружаем видео |
| toBlobCallback | <code>VideoToBlobCallback</code> | обработчик генерации блоба из загруженного файла |
| settings | <code>IThumbsSettings</code> | настройки |

<a name="ThumbsGetter.handlePdfSelect"></a>

### ThumbsGetter.handlePdfSelect(file, iframe, toBlobCallback, settings) ⇒ <code>HTMLCanvasElement</code> \| <code>null</code>
Формирование PDF из загруженного файла

**Kind**: static method of [<code>ThumbsGetter</code>](#ThumbsGetter)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | загруженный файл |
| iframe | <code>HTMLIFrameElement</code> | в какой элемент подгружаем PDF |
| toBlobCallback | <code>PDFToBlobCallback</code> | обработчик генерации блоба из загруженного файла |
| settings | <code>IThumbsSettings</code> | настройки |

