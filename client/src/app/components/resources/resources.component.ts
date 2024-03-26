import { Component } from '@angular/core';

interface Resource {
  name: string;
  url: string;
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  resources: Resource[] = [
    { name: 'Women\'s Health Workshop', url: 'http://example.com/womens-health-workshop' },
    { name: 'Empowerment Activities Guide', url: 'http://example.com/empowerment-activities' },
    { name: 'Mental Health Resources', url: 'http://example.com/mental-health-support' },
    { name: 'Self-Care Toolkit', url: 'http://example.com/self-care-toolkit' },
    { name: 'Goal Setting Guide', url: 'http://example.com/goal-setting-guide' },
    { name: 'Nutrition and Wellness Program', url: 'http://example.com/nutrition-wellness-program' },
    { name: 'Financial Literacy Resources', url: 'http://example.com/financial-literacy' },
    { name: 'Career Development Workshops', url: 'http://example.com/career-development' },
    { name: 'Community Support Network', url: 'http://example.com/community-support' },
    { name: 'Legal Aid Services', url: 'http://example.com/legal-aid-services' }
  ];

  openSurvey() {
    // Open the survey in a new window
  }
}