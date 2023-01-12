import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const NOTIFICATION_ANIMATION = trigger('flyInOut', [
  state(
    'inactive',
    style({
      opacity: 1,
    })
  ),
  transition(
    'inactive <=> active',
    animate(
      '500ms ease-out',
      keyframes([
        style({
          transform: 'translateX(340px)',
          offset: 0,
          opacity: 0,
        }),
        style({
          offset: 0.7,
          opacity: 1,
          transform: 'translateX(-20px)',
        }),
        style({
          offset: 1,
          transform: 'translateX(0)',
        }),
      ])
    )
  ),
  transition(
    'active => removed',
    animate(
      '500ms ease-in',
      keyframes([
        style({
          transform: 'translateX(-20px)',
          opacity: 1,
          offset: 0.2,
        }),
        style({
          opacity: 0,
          transform: 'translateX(340px)',
          offset: 1,
        }),
      ])
    )
  ),
]);
