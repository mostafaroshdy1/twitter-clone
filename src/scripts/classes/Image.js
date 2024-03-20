"use strict";
export { Image }

class Image {
    static cloudName = 'dlmq1xbtj';
    static uploadPreset = 'twitter-clone';
    static endpoint = `https://api.cloudinary.com/v1_1/${Image.cloudName}/upload`
    url;
    formData;
    constructor(file) {
        this.formData = new FormData();
        this.formData.append('file', file);
        this.formData.append('upload_preset', Image.uploadPreset);
    }
    async upload() {
        try {
            const response = await fetch(Image.endpoint, {
                method: 'POST',
                body: this.formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            this.url = data.secure_url;
            // console.log('Upload successful:', this.url);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}