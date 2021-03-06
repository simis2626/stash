import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "hammerjs";
import {WelcomeComponent} from "./welcome/welcome.component";
import {MaterialSharedModule} from "./material-shared/material-shared.module";
import {UserauthComponent} from "./userauth/userauth.component";
import {BrandingComponent} from "./branding/branding.component";
import {ReportWidgetComponent} from "./report-widget/report-widget.component";
import {FABComponent} from "./fab/fab.component";
import {TimesThisWeekComponent} from "./times-this-week/times-this-week.component";
import {RecentAddWidgetComponent} from "./recent-add-widget/recent-add-widget.component";
import {AddAccountComponent} from "./add-account/add-account.component";
import {AuthLocalService} from "./auth-local.service";
import {Auth0AuthService} from "./auth0-auth.service";
import {UserService} from "./user.service";
import {RecentAddGroupComponent} from "./recent-add-group/recent-add-group.component";
import {AddWorkoutParentComponent} from "./add-workout-parent/add-workout-parent.component";
import {ActivitiesService} from "./activities.service";
import {AddWeightParentComponent} from "./add-weight-parent/add-weight-parent.component";
import {WeighInService} from "./weigh-in.service";
import {MarketingComponent} from "./marketing/marketing.component";
import {WorkoutsService} from "./workouts.service";
import {TargetWOService} from "./target-wo.service";
import {AddTargetComponent} from "./add-target/add-target.component";
import {ActivityaddComponent} from "./activityadd/activityadd.component";
import {LoadSpinnerComponent} from "./load-spinner/load-spinner.component";
import {StatsComponent} from "./stats/stats.component";
import {FitbitSuccessComponent} from "./fitbit-success/fitbit-success.component";
import { TaxFormComponent } from './tax-form/tax-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UserauthComponent,
    BrandingComponent,
    ReportWidgetComponent,
    FABComponent,
    TimesThisWeekComponent,
    RecentAddWidgetComponent,
    AddAccountComponent,
    RecentAddGroupComponent,
    AddWorkoutParentComponent,
    AddWeightParentComponent,
    MarketingComponent,
    AddTargetComponent,
    ActivityaddComponent,
    LoadSpinnerComponent,
    StatsComponent,
    FitbitSuccessComponent,
    TaxFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule
  ],
  providers: [AuthLocalService, Auth0AuthService, UserService, ActivitiesService, WeighInService, WorkoutsService, TargetWOService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
