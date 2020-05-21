export declare namespace ImageGenerator {
    /**
     * Сигнатура обработчика получения превью PDF-файла
     */
    type PDFToBlobCallback = (result: File | null, canvas: HTMLCanvasElement, iframe: HTMLIFrameElement, file: File) => void;
    /**
     * Сигнатура обработчика получения превью видео
     */
    type VideoToBlobCallback = (result: File | null, canvas: HTMLCanvasElement, video: HTMLVideoElement, file: File) => void;
    /**
     * Сигнатура обработчика получения превью изображения
     */
    type ImageToBlobCallback = (result: File | null) => void;
    /**
     * Интерфейс настроек изображения
     */
    interface IThumbsSettings {
        /**
         * Максимальная высота
         */
        maxHeight?: number;
        /**
         * Максимальная ширина
         */
        maxWidth?: number;
        /**
         * Качество выходного изображения
         */
        imageQuality?: number;
    }
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
        static getDimensions(this: HTMLImageElement | HTMLVideoElement, settings: IThumbsSettings): {
            height: number;
            width: number;
        };
        /**
         * Генерация имени полученного изображения
         *
         * @param {string} filename
         *
         * @returns {string}
         */
        static getImageName(filename: string): string;
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
        static handleImageSelect(file: File, image: HTMLImageElement, toBlobCallback: ImageToBlobCallback, settings?: IThumbsSettings): HTMLCanvasElement | null;
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
        static handleVideoSelect(file: File, video: HTMLVideoElement, toBlobCallback: VideoToBlobCallback, settings?: IThumbsSettings): HTMLCanvasElement | null;
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
        static handlePdfSelect(file: File, iframe: HTMLIFrameElement, toBlobCallback: PDFToBlobCallback, settings?: IThumbsSettings): Promise<HTMLCanvasElement | null>;
    }
}
