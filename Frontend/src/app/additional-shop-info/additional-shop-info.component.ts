import { Component, OnInit } from '@angular/core';
import {Niche} from "../../models/niche.model";
import {ChartDataSets} from "chart.js";
import {Color, Label} from "ng2-charts";
import {ShopService} from "../../services/shop.service";
import {NicheService} from "../../services/niche.service";

@Component({
  selector: 'app-additional-shop-info',
  templateUrl: './additional-shop-info.component.html',
  styleUrls: ['./additional-shop-info.component.scss']
})
export class AdditionalShopInfoComponent implements OnInit {

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

  constructor(public shopService: ShopService,public nicheService: NicheService) {
    //this.shopService.getShopFromUrl(this.shopList[number].id);
    console.log("constructeur");
    this.shopService.shopSelected$.subscribe((shop) => {
      console.log('shop : '+shop);
      this.nicheService.getShopNichesFromUrl(shop.id+'');
      this.nicheService.niches$.subscribe((nichs)=>{
        this.niches=nichs;
        this.buildListFreq();
      });
    });
  }

  buildListFreq(){
    this.niches.forEach(niche=>{
      this.listFreq.push(niche.nbPersonneMoyenne);
    })
  }

  ngOnInit(): void {
  }

}
