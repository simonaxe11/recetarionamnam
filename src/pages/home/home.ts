import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase' ;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itemsRef: AngularFireList<any>;
  recetas: Observable<any[]>;

  imageSource;
  fotoReceta;

  constructor(public navCtrl: NavController, af: AngularFireDatabase) {

    this.itemsRef = af.list('/recetas')
    this.recetas = this.itemsRef.valueChanges();

    console.log(this.recetas);
  }

  getPhotoURL(image){
    firebase.storage().ref().child('images/'+ image+'.jpg').getDownloadURL().then((url)=>{
    this.fotoReceta = url;
  })
 }

 borrarReceta(id){
  this.itemsRef.remove(id);
}

}
