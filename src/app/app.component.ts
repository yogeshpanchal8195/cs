import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationModel, CategoryModel } from './locationmodel';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  locationIndex:number=-1;
  branchIndex:number=-1;
  showDropDown:boolean=false;
  currentCategory:string="";
  showSecondCombo:boolean=false;
  selectedLocation:string="SELECT LOCATION"
  LocationList:Array<LocationModel>=[];
  categories:Array<CategoryModel>=[]
  constructor(
    private http:HttpClient,
    // private router:Router,
    // private route: ActivatedRoute
  ){}

  ngOnInit(){
      this.http.get('../assets/catalog.json').subscribe((data:any)=>{
        if(data && data.data){
          this.LocationList=data.data.locations;
          console.log(this.LocationList )
        }
      })

      // this.route.queryParams.subscribe(params => {
      //   console.log(params); // {order: "popular"}
      //   console.log(params.category); // popular
      //   this.currentCategory=params.category||''
      // });
  }

  locationClicked($event,index:number){
    this.locationIndex=index;
    this.showSecondCombo=true;
    $event.stopPropagation();
  }

  selectLocation($event){
    this.showDropDown=true;
    this.showSecondCombo=false;
    $event.stopPropagation();
  }

  bodyClicked($event){
    this.showDropDown=false;
    this.showSecondCombo=false;
  }

  branchClicked(idx,index){
    this.showDropDown=false;
    this.branchIndex=index;
    this.showSecondCombo=false;
    this.selectedLocation=this.LocationList[idx].name;
    this.categories=this.LocationList[idx].branches[index].categories;
  }

  goBack(){
    if(this.currentCategory){
      this.categories=this.LocationList[this.locationIndex].branches[this.branchIndex].categories;
      this.currentCategory="";
    }
  }

  linkClicked(route,id){
    this.categories=this.LocationList[this.locationIndex].branches[this.branchIndex].categories[id].subcategories;
    this.currentCategory=this.LocationList[this.locationIndex].branches[this.branchIndex].categories[id].name
    // this.router.navigate(["/location"],{ queryParams: { category: route}})
  }
}
