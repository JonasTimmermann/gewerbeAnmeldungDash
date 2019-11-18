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
  deleteId: number = -1;
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
deleteOn:boolean = false;


antOpAnzahl: number = 1;




fakeArray = new Array(this.antOpAnzahl);

realArray = new Array<String>(this.fakeArray.length);

antOpString: string = "";



// frage: Frage = {id: 1, frage: "Familienstand?", kategorie: "Neugründung", antwortTyp: "RadioButton", antwortOptionen:"ledig;verheiratet;verwitwet", hinweis: "Familienstatus eintragen"};
frage: Frage = {id: 1, frage: "", kategorie: "", antwortTyp: "", antwortOptionen:"", hinweis: ""};

confirm: string = "";


currentId:number = 0;

check:boolean = false;




constructor(private api: HttpRequestService) { }



  ngOnInit() {

this.kat = [{id: 1, name: "Neu"},{id: 2, name: "Wieder"},{id: 3, name: "Alt"}];

this.antwortMoeglichkeiten = [{id: 1, name: "Text-Eingabe"},{id: 2, name: "RadioButton"},{id: 3, name: "Checkbox"}, {id: 4, name: "Text u. Checkbox"}];
this.selectedValue = "Moin";

this.antOpAnzahl = 1;

this.frage = {id: 1, frage: "Frage eingeben", kategorie: "", antwortTyp: "", antwortOptionen:"", hinweis: ""};



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




//id: Kategorien

  toggleEdit(){


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
     // console.log(id);
      console.log(this.frage.antwortTyp);
      //getted from binding
   
    
  }



  myClick(id:any): void {
    
    console.log("Click worked" + id.id);

    this.deleteId = id.id;  
    this.deleteOn = true;

    this.frage.id = id.id;
    this.frage.frage = id.frage;
    this.frage.kategorie = id.kategorie;
    this.frage.antwortTyp = id.antwortTyp;
    this.frage.antwortOptionen = id.antwortOptionen;
    this.toggleEdit();
    

    this.realArray = id.antwortOptionen.split(";");
    

    console.log(this.realArray);

    this.fakeArray = new Array(this.realArray.length);
    this.frage.hinweis = id.hinweis;



    
   
   // var myTable = document.getElementById('tabId');
   // myTable.style.backgroundColor = 'Red';


  }
    

deleteFrage(): void{

  this.url2 = 'http://localhost:8080/frage/' + this.deleteId;


  this.api.deleteFrage(this.deleteId, this.url2).subscribe(data => data => {console.log(data);this.data = data;},err => {console.log(err);});



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


  this.deleteOn = false;
  this.deleteId = -1;

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



      //Change Frage
      if(this.data.length > 0){

        for(let t = 0; t < this.data.length; t++){
          
          if(this.data[t].id == this.frage.id){
            
            console.log("Entry changed!!!");

           
            for(let u2 = 0; u2 < this.realArray.length; u2++){

              this.antOpString += this.realArray[u2];

              if(u2 < this.realArray.length -1){
                this.antOpString += ";";
              }
          }
          this.frage.antwortOptionen = this.antOpString;



          this.api.updateFrage(this.frage, this.url).subscribe( data => data=> {console.log(data);this.data = data;}, err => {console.log(err);});


            this.check = true;

          }

        }

      }




if(!this.check){
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
      

}


   // this.confirm = this.frage.frage + "   --> wurde hinzugefügt";    

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
