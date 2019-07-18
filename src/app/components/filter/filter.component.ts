import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  mergedList: any;
  pathwayDetails: any;
  filteredCourses = [];
  subjectList = [];
  yearList = [];
  dropdownSettings1: any;
  dropdownSettings2: any;
  selectedSubjects = [];
  selectedYears = [];
  allCourses = [];

  constructor(private apiCallService: ApicallService) {
  }
  ngOnInit() {
    this.mergedList = this.apiCallService.getMergedCourses();
    this.pathwayDetails = this.apiCallService.getPathwayDetails();
    this.allCourses = [...this.mergedList.courses];
    this.filteredCourses = this.mergedList.courses;
    this.subjectList = this.mergedList.subjects;
    this.yearList = this.pathwayDetails.years;

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'subjectId',
      textField: 'subjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'year',
      textField: 'yearDisplay',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.selectedSubjects = this.subjectList;
    this.selectedYears = this.yearList;
  }
  onItemSelect(item: any, type: string) {
    this.filteredCourses = [];
    if (type === 'subject') {
      this.filteredCourses = this.getMatchedSubjectList();
    } else {
      this.filteredCourses = this.getMatchedSubjectList();
    }
  }
  onSelectAll(item: any, type: string) {
    if (type === 'subject') {
      this.selectedSubjects = item;
      this.filteredCourses = this.getMatchedSubjectList();
    } else {
      this.selectedYears = item;
      this.filteredCourses = this.getMatchedSubjectList();
    }
  }
  onDeSelectAll(item: any, type: string) {
    if (type === 'subject') {
      this.selectedSubjects = [];
      this.filteredCourses = this.getMatchedSubjectList();
    } else {
      this.selectedYears = [];
      this.filteredCourses = this.getMatchedSubjectList();
    }
  }
  onItemDeSelect(item: any, type: string) {
    if (type === 'subject') {
      this.filteredCourses = this.getMatchedSubjectList();
    } else {
      this.filteredCourses = this.getMatchedSubjectList();
    }
  }
  getMatchedSubjectList() {
    const listArray = [];
    for (const course of this.allCourses) {
      if (this.selectedSubjects.length > 0 && this.selectedYears.length > 0) {
        for (const selectSub of this.selectedSubjects) {
          for (const selectedYear of this.selectedYears) {
            if (course.subjectId === selectSub.subjectId && course.recommendedGrade === selectedYear.year) {
              listArray.push(course);
            }
          }
        }
      } else if (this.selectedSubjects.length > 0) {
        for (const selectSub of this.selectedSubjects) {
          if (course.subjectId === selectSub.subjectId) {
            listArray.push(course);
          }
        }
      } else if (this.selectedYears.length > 0) {
        for (const selectedYear of this.selectedYears) {
          if (course.recommendedGrade === selectedYear.year) {
            listArray.push(course);
          }
        }
      }
      // } else if (this.selectedYears.length === 0 && this.selectedSubjects.length === 0) {
      //   listArray = this.allCourses;
      // }
    }
    return listArray;
  }
}
