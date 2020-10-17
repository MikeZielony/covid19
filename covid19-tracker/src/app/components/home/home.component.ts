import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../../services/data-service.service";
import {GlobalDataSummary} from "../../models/global-data";
import {GoogleChartInterface} from "ng2-google-charts";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  pieChart : GoogleChartInterface = {
    chartType : 'PieChart'
  }

  columnChart : GoogleChartInterface = {
    chartType : 'columnChart'
  }

  constructor(private dataService : DataServiceService) { }

  initChart(){

    let datatable = [];
    datatable.push(["Country", "Przypadki"])
    this.globalData.forEach(cs=>{
      if(cs.confirmed > 200000)
      datatable.push([cs.country,cs.confirmed])
    })


    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height : 600
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height : 600
      },
    };


  }

  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next : (result)=>{
            this.globalData = result;

            result.forEach(cs=>{
              if(!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.recovered
              }
            })

            this.initChart();
          }
        }
      )
  }

}
