import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ContentService {

    public goToContact = false;
    public covers;

    constructor(
        // public fs: AngularFirestore
        ) {}

    getSlider() {
        // return this.fs.collection('slider').snapshotChanges();
    }

    addSlider(data) {
        // this.fs.collection('slider').add({
        //     image : data.image,
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     subtitle_Ar : data.subtitle_Ar,
        //     subtitle_En : data.subtitle_En,
        // });
    }

    updateSlider(docId, data) {
        // this.fs.collection('slider')
        // .doc(docId).update({
        //     image : data.image,
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     subtitle_Ar : data.subtitle_Ar,
        //     subtitle_En : data.subtitle_En,
        // });
    }

    deleteSlider(docId) {
        // this.fs.collection('slider').doc(docId).delete();
    }

    getFeatures() {
        // return this.fs.collection('top-features').snapshotChanges();
    }

    removeFeatures(docId) {
        // this.fs.collection('top-features').doc(docId).delete();
    }

    addFeature(data) {
        // this.fs.collection('top-features').add({
        //     title_Ar: data.title_Ar,
        //     subtitle_Ar: data.subtitle_Ar,
        //     title_En: data.title_En,
        //     subtitle_En: data.subtitle_En,
        //     image: data.image,
        // });
    }

    updateFeatures(docId, data) {
        // this.fs.collection('top-features')
        // .doc(docId).update({
        //     title_Ar: data.title_Ar,
        //     subtitle_Ar: data.subtitle_Ar,
        //     title_En: data.title_En,
        //     subtitle_En: data.subtitle_En,
        //     image: data.image,
        // });
    }

    getCompany() {
        // return this.fs.collection('company').valueChanges();
    }

    getTopServices() {
        // return this.fs.collection('top-services').snapshotChanges();
    }

    updateTopServices(docId, data) {
        // this.fs.collection('top-services')
        // .doc(docId).update({
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     image : data.image
        // });
    }

    getServices() {
        // return this.fs.collection('services').snapshotChanges();
    }

    updateServices(docId, data) {
        // this.fs.collection('services')
        // .doc(docId).update({
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     details_Ar : data.details_Ar,
        //     details_En : data.details_En,
        //     image : data.image,
        // });
    }

    updateCover(docId, image) {
        // this.fs.collection('backgrounds')
        // .doc(docId).update({
        //     image,
        // });
    }

    getCovers() {
        // this.fs.collection('backgrounds').valueChanges().subscribe(data => {
        //     this.covers = data;
        //     console.log(this.covers);
        //   });
    }

    addServices(data) {
        // this.fs.collection('services').add({
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     details_Ar : data.details_Ar,
        //     details_En : data.details_En,
        //     image : data.image,
        //     show: true,
        // });
    }

    showService(docId) {
        // this.fs.collection('services')
        // .doc(docId).update({
        //     show: true,
        // });
    }

    hideService(docId) {
        // this.fs.collection('services')
        // .doc(docId).update({
        //     show: false,
        // });
    }

    removeService(docId) {
        // this.fs.collection('services').doc(docId).delete();
    }

    getClients() {
        // return this.fs.collection('clients').snapshotChanges();
    }

    addClient(url) {
        // this.fs.collection('clients').add({
        //     image : url
        // });
    }

    removeClient(docId) {
        // this.fs.collection('clients').doc(docId).delete();
    }

    getTopPortfolio() {
        // return this.fs.collection('top-portfolio').snapshotChanges();
    }

    updateTopPortfolio(docId, data) {
        // this.fs.collection('top-portfolio')
        // .doc(docId).set({
        //     image : data.image,
        //     tag_Ar : data.tag_Ar,
        //     tag_En : data.tag_En,
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        // }, { merge: true });
    }

    getPortfolio() {
        // return this.fs.collection('portfolio').snapshotChanges();
    }

    addPortfolio(data) {
        // this.fs.collection('portfolio').add({
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     tag_Ar : data.tag_Ar,
        //     tag_En : data.tag_En,
        //     image1 : data.image1,
        //     image2 : data.image2,
        //     image3 : data.image3,
        //     image4 : data.image4,
        // });
    }

    updatePortfolio(docId, data) {
        // this.fs.collection('portfolio')
        // .doc(docId).update({
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     tag_Ar : data.tag_Ar,
        //     tag_En : data.tag_En,
        //     image1 : data.image1,
        //     image2 : data.image2,
        //     image3 : data.image3,
        //     image4 : data.image4,
        // });
    }

    removePortfolio(docId) {
        // this.fs.collection('portfolio').doc(docId).delete();
    }

    getAbout() {
        // return this.fs.collection('about').valueChanges();
    }

    updateAbout(docId, data) {
        // const keyAr = data['keyAr'];
        // const KeyEn = data['keyEn'];
        // const valueAr = data['valueAr'];
        // const valueEn = data['valueEn'];

        // const Update = {};
        // Update[keyAr] = valueAr;
        // Update[KeyEn] = valueEn;

        // this.fs.collection('about')
        // .doc(docId).update(Update);
    }

    updateCompany(docId, data) {
        // const keyAr = data['keyAr'];
        // const KeyEn = data['keyEn'];
        // const valueAr = data['valueAr'];
        // const valueEn = data['valueEn'];

        // const Update = {};
        // if (valueAr !== undefined) {
        //     Update[keyAr] = valueAr;
        // }
        // Update[KeyEn] = valueEn;

        // this.fs.collection('company')
        // .doc(docId).update(Update);
    }

    hasPage() {
        // return this.fs.collection('sixth-page').snapshotChanges();
    }

    removeSixthPage() {

        // const Update = {};
        // Update['show'] = false;

        // this.fs.collection('sixth-page')
        // .doc('meta').update(Update);

        // this.fs.collection('sixth-page').snapshotChanges().subscribe( data => {
        //     if (data.length > 1) {
        //         for (let index = 0; index < data.length - 1; index++) {
        //             const docId = data[index].payload.doc.id;
        //             this.fs.collection('sixth-page').doc(docId).delete();
        //         }
        //     }
        // });
    }

    addSixthPage(data) {
        // this.fs.collection('sixth-page').add({
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     subtitle_Ar : data.subtitle_Ar,
        //     subtitle_En : data.subtitle_En,
        //     image : data.image,
        // });

        // const Update = {};
        // Update['show'] = true;

        // this.fs.collection('sixth-page')
        // .doc('meta').update(Update);
    }

    updateSixthPage(docId, data) {
        // this.fs.collection('sixth-page')
        // .doc(docId).update({
        //     title_Ar : data.title_Ar,
        //     title_En : data.title_En,
        //     subtitle_Ar : data.subtitle_Ar,
        //     subtitle_En : data.subtitle_En,
        //     image : data.image,
        // });
    }

    removeSixthPageItem(docId) {
        // this.fs.collection('sixth-page').doc(docId).delete();
    }

}
