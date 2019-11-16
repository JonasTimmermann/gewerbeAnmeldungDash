import { Component, OnInit } from '@angular/core';
import {HttpRequestService} from '../http-request.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {




  url = 'http://localhost:8080/frage';
  //url2 = 'kp';
  deleteId: number = 1;
  url2 = 'http://localhost:8080/frage/' + this.deleteId;

  public data: any;


names: String[] = ["Emil", "Tobias", "Linus"];

selectedValue:string = "";
selectedValueKat:string = "";

kat: Kategorien[] = [];

antwortMoeglichkeiten: Kategorien[] = [];

radioOn: boolean = false;
CheckOn: boolean = false;
TextOn: boolean = false;
TextCheckOn: boolean = false;

isEdit:boolean = false;


antOpAnzahl: number = 1;




fakeArray = new Array(this.antOpAnzahl);

realArray = new Array<String>(this.fakeArray.length);

antOpString: string = "";



// frage: Frage = {id: 1, frage: "Familienstand?", kategorie: "Neugründung", antwortTyp: "RadioButton", antwortOptionen:"ledig;verheiratet;verwitwet", hinweis: "Familienstatus eintragen"};
frage: Frage = {id: 1, frage: "", kategorie: "", antwortTyp: "", antwortOptionen:"", hinweis: ""};

confirm: string = "";


currentId:number = 0;





constructor(private api: HttpRequestService) { }



  ngOnInit() {

this.kat = [{id: 1, name: "Neu"},{id: 2, name: "Wieder"},{id: 3, name: "Alt"}];

this.antwortMoeglichkeiten = [{id: 1, name: "Text-Eingabe"},{id: 2, name: "RadioButton"},{id: 3, name: "Checkbox"}, {id: 4, name: "Text u. Checkbox"}];
this.selectedValue = "Moin";

this.antOpAnzahl = 1;





this.api
.getFrage(this.url)
.subscribe(
  data => {
    console.log(data);
    this.data = data;
  },
  err => {
    console.log(err);
  }
);

  }






  toggleEdit(id: Kategorien){


    if(this.frage.antwortTyp == "RadioButton"){
      console.log("ok worked")
      this.radioOn = true;
    }else{
      this.radioOn = false;
    }

    if(this.frage.antwortTyp == "Checkbox"){
      console.log("ok worked")
      this.CheckOn = true;
    }else{
      this.CheckOn = false;
    }

    if(this.frage.antwortTyp == "Text-Eingabe"){
      console.log("ok worked")
      this.TextOn = true;
    }else{
      this.TextOn = false;
    }

    if(this.frage.antwortTyp == "Text u. Checkbox"){
      console.log("ok worked")
      this.TextCheckOn = true;
    }else{
      this.TextCheckOn = false;
    }


      
    
      //this.isEdit = !this.isEdit;
      //getted from event
      console.log(id);
      console.log(this.frage.antwortTyp);
      //getted from binding
   
    
  }




  
  createFrage(): void {
    
    this.api
      .getFrage(this.url)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        },
        err => {
          console.log(err);
        }
      );

      if(this.data.length > 0){  
      this.currentId = this.data[this.data.length -1].id + 1;
      this.frage.id = this.currentId;
      }else{
        this.frage.id = 1;
      }
    //this.frage.antwortTyp = this.selectedValue;
    //this.frage.kategorie = this.selectedValueKat;


    for(let u = 0; u < this.realArray.length; u++){

        this.antOpString += this.realArray[u];
        if(u < this.realArray.length -1){
          this.antOpString += ";";
        }
    }

    this.frage.antwortOptionen = this.antOpString;
    //this.person.id = this.data[this.data.length - 1].id + 1;
    this.api.createFrage(this.frage, this.url).subscribe( data => data=> {console.log(data);this.data = data;}, err => {console.log(err);});





    this.confirm = this.frage.frage + "   --> wurde hinzugefügt";    

  };



/** 

  deletePerson(dId: number): void {
    this.url2 = 'http://localhost:8080/person/' + this.deleteId;
    this.api.deletePerson(dId, this.url2).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };


  updatePerson(): void {
    this.api.updatePerson(this.personUp, this.url).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };

**/



  addInput(){

    this.antOpAnzahl += 1;
   // this.fakeArray = new Array(this.antOpAnzahl); 
    this.fakeArray.push(this.antOpAnzahl);
    this.realArray.push("");
    console.log(this.realArray);
  }

  deleteInput(){

    if(this.antOpAnzahl > 0){
      this.antOpAnzahl -= 1;
      this.fakeArray = new Array(this.antOpAnzahl); 
      this.realArray.pop();
  }
  }







}



interface Frage{
   
  id:number,
  frage:string,
  kategorie:string,
  antwortTyp:string,
  antwortOptionen:String,
  hinweis:string

}



interface Kategorien{
   
  id:number,
  name:string

}
