import { Component, OnInit } from '@angular/core';
import {Shop} from "../../models/shop.model";
import {ShopService} from "../../services/shop.service";
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {NicheService} from "../../services/niche.service";
import {Niche} from "../../models/niche.model";

@Component({
  selector: 'app-shop-information',
  templateUrl: './shop-information.component.html',
  styleUrls: ['./shop-information.component.scss'],
  providers:[ShopService],

})
export class ShopInformationComponent implements OnInit {

  public presenceNeeded : number;
  public shop : Shop;
  public nbPeopleClose: number;
  public shopRate: number;
  public niches: Niche[];
  public listFreq:number[] =[];
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

  constructor(public shopService: ShopService, public nicheService: NicheService) {
    this.calculateShopRate();
    this.shopService.shopSelected$.subscribe((shop) => {
      this.shop = shop;
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


  private calculateShopRate(){
    this.shopService.shopSelected$.subscribe((shop) =>
    {
      if ( shop.storeRating != undefined
        && shop.storeRating.voterNumber !=0){
        this.shopRate = Math.round(shop.storeRating.averageRate*100)/100;
      }
    });
  }

  public actualizeSeller(){
    //this.shopService.getShopFromUrl(this.shop.id);
  }

  ngOnInit(): void {
    /*interval(1000)
      .pipe(takeWhile(() => true))
      .subscribe(() =>
        this.calculateShopRate());*/

    interval(5000)
      .pipe(takeWhile(() => true))
      .subscribe(() => {
        this.calculateNbPeopleClose();
      });
  }

  private calculateNbPeopleClose() {
    this.shopService.getNbPeopleClose()
      .subscribe(nb => this.nbPeopleClose = nb);
  }

  buildListFreq(){
    this.niches.forEach(niche=>{
      this.listFreq.push(niche.nbPersonneMoyenne);
    })
  }


}
