import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ElementRef, AfterViewInit, HostListener, ComponentFactoryResolver, ViewContainerRef, EventEmitter, OnDestroy } from '@angular/core';
import { LandingPageService } from 'src/app/services/landing-page/landing-page.service';
import { EventsComponent } from '../events/events.component';
import { FundingComponent } from '../funding/funding.component';
import { GrowthComponent } from '../growth/growth.component';
GrowthComponent
const componentClassesMap: any = {
  "funding": FundingComponent,
  "banner": GrowthComponent,
  "event": EventsComponent
};
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnChanges {
  @ViewChild('renderTeamMemberOutlet', { read: ViewContainerRef }) renderTeamMemberOutlet!: ViewContainerRef;
  // @Input() homePageData: any;
  // @Input() section1Data: any;
  // @Input() section2Data: any;
  contentTabs: any = [];
  componentRef: any;
  subscriptions: any = [];
  showAssociatedVendors = false;
  allData: any;
  constructor(
    private landingPage: LandingPageService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  ngOnInit(): void {
    // this.getTemplates()
    // console.log('homePageData', this.homePageData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes && changes.homePageData && changes.homePageData.currentValue) {
    //   this.homePageData = changes.homePageData.currentValue;
    //   console.log('homePageData', this.homePageData);
    //   this.section1Data = this.homePageData?.data?.attributes?.pages?.data[0];
    //   this.section2Data = this.homePageData?.data?.attributes?.pages?.data[1];
    //   this.getTemplates();
    // }
    // console.log('homePageData from navbar com', this.homePageData);
  }

  getTemplates() {
    // {tabName: 'Home', id: 1, componentName: 'Section1Component'},
    // {tabName: 'Information', id: 2, componentName: 'Section2Component'},
    this.landingPage.getSelectedNavbarContent('home').subscribe((res: any) => {
      this.allData = res;
      this.contentTabs = res?.data[0].attributes.templates.map((item: any) => {
        return {
          // id: item.id,
          // order:item.order
          tabName: 'home',
          componentName: item['__component'].split('.')[0],
          ...item
        }
      }).sort((a: any, b: any) => { a.order - b.order });

    }, error => {
      console.log(error)
    }, () => {
      for (const item of this.contentTabs) {
        this.createComponent(item);
      }
    });
  }


  createComponent(component: any) {
    console.log('this.contentTabs', this.contentTabs)
    console.log('createComponent', component);

    let factory: any = []
    factory = this.componentFactoryResolver.resolveComponentFactory(componentClassesMap[component.componentName].prototype.constructor);
    this.componentRef = this.renderTeamMemberOutlet.createComponent(factory);
    this.componentRef.instance.data = component;
  }
  // createComponent(selectedTabComponentName: any) {
  //   console.log('createComponent', selectedTabComponentName)
  //   // if (this.renderTeamMemberOutlet) {
  //   //   this.renderTeamMemberOutlet.clear();
  //   // }
  //   // this.renderTeamMemberOutlet.clear();
  //   const factory = this.componentFactoryResolver.resolveComponentFactory(componentClassesMap[selectedTabComponentName].prototype.constructor);
  //   console.log('factory', factory)
  //   this.componentRef = this.renderTeamMemberOutlet.createComponent(factory);
  //   // add the component to the view
  //   switch(selectedTabComponentName) {
  //     case 'Section1Component':
  //       // this.componentRef.instance.data = this.section1Data;
  //       break;
  //     case 'Section2Component':
  //       // this.componentRef.instance.profileDetail = this.profileDetail;
  //       break;
  //   }
  // }
  // ngOnDestroy(): void {
  //   this.renderTeamMemberOutlet.clear()
  // }

}
