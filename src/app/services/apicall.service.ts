import { Injectable } from '@angular/core';
import { mergedCourses } from './courses-data';
import { pathwayDetail } from './pathwayDetails-data';


@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  constructor() {
  }
  getMergedCourses() {
    return mergedCourses;
  }
  getPathwayDetails() {
    return pathwayDetail;
  }
}
