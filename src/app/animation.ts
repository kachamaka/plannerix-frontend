import { animateChild, query, style, group, animate, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [

      transition('* => Schedule', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),      
      transition('Schedule => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('* => Settings', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('Settings => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
    //   schedule -------------- calendar
      transition('Calendar => Home', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('Home => Calendar', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('Calendar => ReportC', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('ReportC  => Calendar', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
    //   calendar------------------home
      transition('Home  => ReportC', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('ReportC  => Home', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),

      
      // -----------------------------------
      // this is a test
      transition('*  <=> Home', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      
      transition('*  <=> Calendar', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('*  <=> ReportC', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], {optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ])

  ]);