import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  generalResidentStats = {
    totalWomenSupported: 1500, 
    averageAge: 51, 
    averageSatisfactionRating: 4.5 
  };

  applicationStats = {
    totalMessagesSent: 500, 
    totalPlansCreated: 85 
  };

  womenProfileStats = {
    precariousStatusPercent: 12, 
    mentalHealthIssuesPercent: 40, 
    physicalHealthIssuesPercent: 23, 
    violenceVictimsPercent: 54, 
    hasAddiction:25,
    transgenderPercent: 5, 
    recentlyEvictedPercent: 20 
  };

  constructor() { }

  ngOnInit(): void {
  }

  exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
  
    // Column headers
    csvContent += "Category,Key,Value\n";
  
    // General Resident Stats
    Object.entries(this.generalResidentStats).forEach(([key, value]) => {
      csvContent += `General Resident Stats,${key},${value}\n`;
    });
  
    // Application Stats
    Object.entries(this.applicationStats).forEach(([key, value]) => {
      csvContent += `Application Stats,${key},${value}\n`;
    });
  
    // Women Profile Stats
    Object.entries(this.womenProfileStats).forEach(([key, value]) => {
      csvContent += `Women Profile Stats,${key},${value}\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "statistics.csv");
    document.body.appendChild(link);
  
    link.click();
    document.body.removeChild(link);
  }
  

}
