import { Component, OnInit } from '@angular/core';
import {Shop} from "../../models/shop.model";
import {ShopService} from "../../services/shop.service";
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, MultiDataSet} from 'ng2-charts';
import {NicheService} from "../../services/niche.service";
import {Niche} from "../../models/niche.model";

@Component({
  selector: 'app-shop-information',
  templateUrl: './shop-information.component.html',
  styleUrls: ['./shop-information.component.scss'],
  providers: [ShopService],

})
export class ShopInformationComponent implements OnInit {

  public presenceNeeded : number;
  public shop : Shop;
  error: string;
  public nbPeopleClose: number;
  public shopRate: number;
  public niches: Niche[];
  public listFreq:number[] =[];
  averageOfPurchaseByAgeRang: number[]=[];
  averageOfPurchaseBySexRang: number[]=[];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  lineChartData: ChartDataSets[] = [
    { data: this.listFreq, label: 'Nombre moyen de fréquentation' },
  ];
  lineChartLabels: Label[] = ['00H-01H', '01H-02H', '02H-03H', '03H-04H', '04H-05H', '05H-06H', '06H-07H','07H-08H','08H-9H0','09H-10H','10H-11H', '11H-12H', '12H-13H', '13H-14H', '14H-15H', '15H-16H','16H-17H','17H-18H','18H-19H','19H-20H','20H-21H','21H-22H','22H-23H','23H-00H'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(116, 52, 235, 1)',
    },
  ];

  doughnutChartLabels: Label[] = ['0-14 ans', '15-29 ans', '30-44 ans','45-59 ans','60-74 ans','75 ans-+'];
  doughnutChartData: MultiDataSet=[[0,0,0,0,0,0]];
  doughnutChartType: ChartType = 'doughnut';

  doughnutChartLabels2: Label[] = ['Masculin','Feminin'];
  doughnutChartData2: MultiDataSet=[[0,0]];
  doughnutChartType2: ChartType = 'doughnut';

  /**
   * The constructor is used to set up graphs related to this component
   *
   * @param shopService bring the ShopService in this component
   * @param nicheService bring the NicheService in this component
   */

  constructor(public shopService: ShopService, public nicheService: NicheService) {
    this.calculateShopRate();
    this.shopService.shopSelected$.subscribe((shop) => {
      this.shop = shop;
      this.computeAverageOfPurchaseByAgeRang();
      this.computeAverageOfPurchaseBySexRang();
      this.doughnutChartData = [this.averageOfPurchaseByAgeRang];
      this.doughnutChartData2 = [this.averageOfPurchaseBySexRang];

      console.log(this.doughnutChartData)
      if (this.shop.averagePresenceBeforePurchase != undefined && this.shop.averagePresenceBeforePurchase.numberOfPurchases !=0){
        this.presenceNeeded = this.shop.averagePresenceBeforePurchase.numberOfPresence / this.shop.averagePresenceBeforePurchase.numberOfPurchases;
        this.presenceNeeded = Math.round(this.presenceNeeded*100)/100;
      }
      this.calculateNbPeopleClose();
      this.nicheService.getShopNichesFromUrl(this.shop.id+'');
      this.nicheService.niches$.subscribe((niche)=>{
        this.niches=niche;
        this.buildListFreq();
      });
    });
  }

  /**
   * This method determine the rate of a shop
   */

  private calculateShopRate(){
    this.shopService.shopSelected$.subscribe((shop) =>
    {
      if ( shop.storeRating != undefined
        && shop.storeRating.voterNumber !=0){
        this.shopRate = Math.round(shop.storeRating.averageRate*100)/100;
      }
    });
  }

  /**
   * ngOnInit use a periodic observable to call a function
   */

  ngOnInit(): void {
    interval(20000)
      .pipe(takeWhile(() => true))
      .subscribe(() => {
        this.calculateNbPeopleClose();
      });
  }

  /**
   * This method determines the number of people close to a specific shop
   */

  private calculateNbPeopleClose() {
    this.shopService.getNbPeopleClose()
      .subscribe(nb => this.nbPeopleClose = nb);
  }

  /**
   * This method build the attendance value of a shop
   */

  buildListFreq(){
    this.niches.forEach(niche=>{
      this.listFreq.push(niche.nbPersonneMoyenne);
    })
  }

  /**
   * This method build different purchasing age of a shop
   */

  computeAverageOfPurchaseByAgeRang(){
    let total=0;
    this.shop.numberOfPurchaseByAgeRang.forEach(nbr =>{
      total+=nbr;
    });

    this.shop.numberOfPurchaseByAgeRang.forEach(nbr =>{
      this.averageOfPurchaseByAgeRang.push(parseFloat(((nbr*100)/total).toFixed(2)));
    })

  }

  /**
   * This method calculates the shop purchase gender distribution
   */

  computeAverageOfPurchaseBySexRang(){
    let total=0;
    this.shop.numberOfPurchaseBySexRang.forEach(nbr =>{
      total+=nbr;
    });

    this.shop.numberOfPurchaseBySexRang.forEach(nbr =>{
      this.averageOfPurchaseBySexRang.push(parseFloat(((nbr*100)/total).toFixed(2)));
    })

  }



}
