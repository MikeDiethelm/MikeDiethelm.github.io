import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface BestPractice {
    category: string;
    icon: string;
    items: string[];
}

interface AngularFeature {
    title: string;
    description: string;
    icon: string;
    color: string;
}

interface AdvancedTopic {
    title: string;
    description: string;
    icon: string;
    topics: string[];
}

interface ArchitecturePattern {
    title: string;
    description: string;
    icon: string;
}

interface CodeExample {
    title: string;
    subtitle: string;
    description: string;
    code: string;
    icon: string;
    language: string;
}

@Component({
    selector: 'app-angular-summary',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatTooltipModule,
        MatDividerModule,
        MatExpansionModule,
        TranslatePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './angular-summary.html',
    styleUrl: './angular-summary.scss'
})
export class AngularSummaryComponent {
    private router = inject(Router);

    readonly version = signal('20');
    readonly panelOpenState = signal(false);

    readonly coreFeatures = signal<AngularFeature[]>([
        {
            title: 'angular.features.signals.title',
            description: 'angular.features.signals.description',
            icon: 'sensors',
            color: 'primary'
        },
        {
            title: 'angular.features.standalone.title',
            description: 'angular.features.standalone.description',
            icon: 'widgets',
            color: 'accent'
        },
        {
            title: 'angular.features.inject.title',
            description: 'angular.features.inject.description',
            icon: 'input',
            color: 'primary'
        },
        {
            title: 'angular.features.controlFlow.title',
            description: 'angular.features.controlFlow.description',
            icon: 'alt_route',
            color: 'accent'
        },
        {
            title: 'angular.features.deferrable.title',
            description: 'angular.features.deferrable.description',
            icon: 'hourglass_empty',
            color: 'primary'
        },
        {
            title: 'angular.features.inputOutput.title',
            description: 'angular.features.inputOutput.description',
            icon: 'swap_horiz',
            color: 'accent'
        },
        {
            title: 'angular.features.viewQueries.title',
            description: 'angular.features.viewQueries.description',
            icon: 'pageview',
            color: 'primary'
        },
        {
            title: 'angular.features.model.title',
            description: 'angular.features.model.description',
            icon: 'sync',
            color: 'accent'
        },
        {
            title: 'angular.features.onPush.title',
            description: 'angular.features.onPush.description',
            icon: 'speed',
            color: 'primary'
        },
        {
            title: 'angular.features.httpClient.title',
            description: 'angular.features.httpClient.description',
            icon: 'cloud_sync',
            color: 'accent'
        },
        {
            title: 'angular.features.resource.title',
            description: 'angular.features.resource.description',
            icon: 'cloud_download',
            color: 'primary'
        },
        {
            title: 'angular.features.typedForms.title',
            description: 'angular.features.typedForms.description',
            icon: 'check_box',
            color: 'accent'
        },
        {
            title: 'angular.features.router.title',
            description: 'angular.features.router.description',
            icon: 'explore',
            color: 'primary'
        },
        {
            title: 'angular.features.material.title',
            description: 'angular.features.material.description',
            icon: 'palette',
            color: 'accent'
        },
        {
            title: 'angular.features.devtools.title',
            description: 'angular.features.devtools.description',
            icon: 'build_circle',
            color: 'primary'
        },
        {
            title: 'angular.features.vite.title',
            description: 'angular.features.vite.description',
            icon: 'flash_on',
            color: 'accent'
        }
    ]);

    readonly bestPractices = signal<BestPractice[]>([
        {
            category: 'angular.bestPractices.components.title',
            icon: 'view_module',
            items: [
                'angular.bestPractices.components.item1',
                'angular.bestPractices.components.item2',
                'angular.bestPractices.components.item3',
                'angular.bestPractices.components.item4',
                'angular.bestPractices.components.item5',
                'angular.bestPractices.components.item6',
                'angular.bestPractices.components.item7',
                'angular.bestPractices.components.item8'
            ]
        },
        {
            category: 'angular.bestPractices.state.title',
            icon: 'storage',
            items: [
                'angular.bestPractices.state.item1',
                'angular.bestPractices.state.item2',
                'angular.bestPractices.state.item3',
                'angular.bestPractices.state.item4',
                'angular.bestPractices.state.item5',
                'angular.bestPractices.state.item6'
            ]
        },
        {
            category: 'angular.bestPractices.templates.title',
            icon: 'code',
            items: [
                'angular.bestPractices.templates.item1',
                'angular.bestPractices.templates.item2',
                'angular.bestPractices.templates.item3',
                'angular.bestPractices.templates.item4',
                'angular.bestPractices.templates.item5'
            ]
        },
        {
            category: 'angular.bestPractices.services.title',
            icon: 'business_center',
            items: [
                'angular.bestPractices.services.item1',
                'angular.bestPractices.services.item2',
                'angular.bestPractices.services.item3',
                'angular.bestPractices.services.item4',
                'angular.bestPractices.services.item5'
            ]
        },
        {
            category: 'angular.bestPractices.performance.title',
            icon: 'speed',
            items: [
                'angular.bestPractices.performance.item1',
                'angular.bestPractices.performance.item2',
                'angular.bestPractices.performance.item3',
                'angular.bestPractices.performance.item4',
                'angular.bestPractices.performance.item5',
                'angular.bestPractices.performance.item6',
                'angular.bestPractices.performance.item7'
            ]
        },
        {
            category: 'angular.bestPractices.typescript.title',
            icon: 'code_blocks',
            items: [
                'angular.bestPractices.typescript.item1',
                'angular.bestPractices.typescript.item2',
                'angular.bestPractices.typescript.item3',
                'angular.bestPractices.typescript.item4',
                'angular.bestPractices.typescript.item5',
                'angular.bestPractices.typescript.item6'
            ]
        },
        {
            category: 'angular.bestPractices.accessibility.title',
            icon: 'accessibility',
            items: [
                'angular.bestPractices.accessibility.item1',
                'angular.bestPractices.accessibility.item2',
                'angular.bestPractices.accessibility.item3',
                'angular.bestPractices.accessibility.item4',
                'angular.bestPractices.accessibility.item5'
            ]
        },
        {
            category: 'angular.bestPractices.testing.title',
            icon: 'science',
            items: [
                'angular.bestPractices.testing.item1',
                'angular.bestPractices.testing.item2',
                'angular.bestPractices.testing.item3',
                'angular.bestPractices.testing.item4',
                'angular.bestPractices.testing.item5'
            ]
        },
        {
            category: 'angular.bestPractices.errorHandling.title',
            icon: 'error_outline',
            items: [
                'angular.bestPractices.errorHandling.item1',
                'angular.bestPractices.errorHandling.item2',
                'angular.bestPractices.errorHandling.item3',
                'angular.bestPractices.errorHandling.item4'
            ]
        },
        {
            category: 'angular.bestPractices.security.title',
            icon: 'shield',
            items: [
                'angular.bestPractices.security.item1',
                'angular.bestPractices.security.item2',
                'angular.bestPractices.security.item3',
                'angular.bestPractices.security.item4',
                'angular.bestPractices.security.item5'
            ]
        },
        {
            category: 'angular.bestPractices.codeOrganization.title',
            icon: 'folder_open',
            items: [
                'angular.bestPractices.codeOrganization.item1',
                'angular.bestPractices.codeOrganization.item2',
                'angular.bestPractices.codeOrganization.item3',
                'angular.bestPractices.codeOrganization.item4',
                'angular.bestPractices.codeOrganization.item5'
            ]
        },
        {
            category: 'angular.bestPractices.dependency.title',
            icon: 'account_tree',
            items: [
                'angular.bestPractices.dependency.item1',
                'angular.bestPractices.dependency.item2',
                'angular.bestPractices.dependency.item3',
                'angular.bestPractices.dependency.item4'
            ]
        },
        {
            category: 'angular.bestPractices.buildDeploy.title',
            icon: 'rocket_launch',
            items: [
                'angular.bestPractices.buildDeploy.item1',
                'angular.bestPractices.buildDeploy.item2',
                'angular.bestPractices.buildDeploy.item3',
                'angular.bestPractices.buildDeploy.item4',
                'angular.bestPractices.buildDeploy.item5'
            ]
        }
    ]);

    readonly technologiesUsed = signal<string[]>([
        'Angular 20',
        'TypeScript 5.9',
        'Signals',
        'Standalone Components',
        'Material Design 3',
        'RxJS 7.8',
        'SCSS',
        'Dependency Injection',
        'OnPush Change Detection',
        'HttpClient',
        'Router',
        'Vite & ESBuild'
    ]);

    readonly advancedTopics = signal<AdvancedTopic[]>([
        {
            title: 'angular.advanced.routing.title',
            description: 'angular.advanced.routing.description',
            icon: 'alt_route',
            topics: [
                'angular.advanced.routing.topic1',
                'angular.advanced.routing.topic2',
                'angular.advanced.routing.topic3',
                'angular.advanced.routing.topic4',
                'angular.advanced.routing.topic5',
                'angular.advanced.routing.topic6'
            ]
        },
        {
            title: 'angular.advanced.forms.title',
            description: 'angular.advanced.forms.description',
            icon: 'description',
            topics: [
                'angular.advanced.forms.topic1',
                'angular.advanced.forms.topic2',
                'angular.advanced.forms.topic3',
                'angular.advanced.forms.topic4',
                'angular.advanced.forms.topic5',
                'angular.advanced.forms.topic6'
            ]
        },
        {
            title: 'angular.advanced.rxjs.title',
            description: 'angular.advanced.rxjs.description',
            icon: 'stream',
            topics: [
                'angular.advanced.rxjs.topic1',
                'angular.advanced.rxjs.topic2',
                'angular.advanced.rxjs.topic3',
                'angular.advanced.rxjs.topic4',
                'angular.advanced.rxjs.topic5',
                'angular.advanced.rxjs.topic6'
            ]
        },
        {
            title: 'angular.advanced.changeDetection.title',
            description: 'angular.advanced.changeDetection.description',
            icon: 'update',
            topics: [
                'angular.advanced.changeDetection.topic1',
                'angular.advanced.changeDetection.topic2',
                'angular.advanced.changeDetection.topic3',
                'angular.advanced.changeDetection.topic4',
                'angular.advanced.changeDetection.topic5'
            ]
        },
        {
            title: 'angular.advanced.animations.title',
            description: 'angular.advanced.animations.description',
            icon: 'animation',
            topics: [
                'angular.advanced.animations.topic1',
                'angular.advanced.animations.topic2',
                'angular.advanced.animations.topic3',
                'angular.advanced.animations.topic4',
                'angular.advanced.animations.topic5'
            ]
        },
        {
            title: 'angular.advanced.testing.title',
            description: 'angular.advanced.testing.description',
            icon: 'bug_report',
            topics: [
                'angular.advanced.testing.topic1',
                'angular.advanced.testing.topic2',
                'angular.advanced.testing.topic3',
                'angular.advanced.testing.topic4',
                'angular.advanced.testing.topic5',
                'angular.advanced.testing.topic6'
            ]
        },
        {
            title: 'angular.advanced.ssr.title',
            description: 'angular.advanced.ssr.description',
            icon: 'dns',
            topics: [
                'angular.advanced.ssr.topic1',
                'angular.advanced.ssr.topic2',
                'angular.advanced.ssr.topic3',
                'angular.advanced.ssr.topic4',
                'angular.advanced.ssr.topic5',
                'angular.advanced.ssr.topic6'
            ]
        },
        {
            title: 'angular.advanced.i18n.title',
            description: 'angular.advanced.i18n.description',
            icon: 'language',
            topics: [
                'angular.advanced.i18n.topic1',
                'angular.advanced.i18n.topic2',
                'angular.advanced.i18n.topic3',
                'angular.advanced.i18n.topic4',
                'angular.advanced.i18n.topic5'
            ]
        },
        {
            title: 'angular.advanced.security.title',
            description: 'angular.advanced.security.description',
            icon: 'security',
            topics: [
                'angular.advanced.security.topic1',
                'angular.advanced.security.topic2',
                'angular.advanced.security.topic3',
                'angular.advanced.security.topic4',
                'angular.advanced.security.topic5',
                'angular.advanced.security.topic6'
            ]
        },
        {
            title: 'angular.advanced.directives.title',
            description: 'angular.advanced.directives.description',
            icon: 'extension',
            topics: [
                'angular.advanced.directives.topic1',
                'angular.advanced.directives.topic2',
                'angular.advanced.directives.topic3',
                'angular.advanced.directives.topic4',
                'angular.advanced.directives.topic5'
            ]
        },
        {
            title: 'angular.advanced.pipes.title',
            description: 'angular.advanced.pipes.description',
            icon: 'transform',
            topics: [
                'angular.advanced.pipes.topic1',
                'angular.advanced.pipes.topic2',
                'angular.advanced.pipes.topic3',
                'angular.advanced.pipes.topic4',
                'angular.advanced.pipes.topic5'
            ]
        },
        {
            title: 'angular.advanced.httpInterceptors.title',
            description: 'angular.advanced.httpInterceptors.description',
            icon: 'sync_alt',
            topics: [
                'angular.advanced.httpInterceptors.topic1',
                'angular.advanced.httpInterceptors.topic2',
                'angular.advanced.httpInterceptors.topic3',
                'angular.advanced.httpInterceptors.topic4',
                'angular.advanced.httpInterceptors.topic5'
            ]
        },
        {
            title: 'angular.advanced.stateManagement.title',
            description: 'angular.advanced.stateManagement.description',
            icon: 'inventory_2',
            topics: [
                'angular.advanced.stateManagement.topic1',
                'angular.advanced.stateManagement.topic2',
                'angular.advanced.stateManagement.topic3',
                'angular.advanced.stateManagement.topic4',
                'angular.advanced.stateManagement.topic5'
            ]
        },
        {
            title: 'angular.advanced.moduleFederation.title',
            description: 'angular.advanced.moduleFederation.description',
            icon: 'hub',
            topics: [
                'angular.advanced.moduleFederation.topic1',
                'angular.advanced.moduleFederation.topic2',
                'angular.advanced.moduleFederation.topic3',
                'angular.advanced.moduleFederation.topic4'
            ]
        },
        {
            title: 'angular.advanced.pwa.title',
            description: 'angular.advanced.pwa.description',
            icon: 'install_mobile',
            topics: [
                'angular.advanced.pwa.topic1',
                'angular.advanced.pwa.topic2',
                'angular.advanced.pwa.topic3',
                'angular.advanced.pwa.topic4',
                'angular.advanced.pwa.topic5'
            ]
        }
    ]);

    readonly architecturePatterns = signal<ArchitecturePattern[]>([
        {
            title: 'angular.architecture.smartDumb.title',
            description: 'angular.architecture.smartDumb.description',
            icon: 'account_tree'
        },
        {
            title: 'angular.architecture.facade.title',
            description: 'angular.architecture.facade.description',
            icon: 'layers'
        },
        {
            title: 'angular.architecture.module.title',
            description: 'angular.architecture.module.description',
            icon: 'category'
        },
        {
            title: 'angular.architecture.lazy.title',
            description: 'angular.architecture.lazy.description',
            icon: 'schedule'
        },
        {
            title: 'angular.architecture.repository.title',
            description: 'angular.architecture.repository.description',
            icon: 'storage'
        },
        {
            title: 'angular.architecture.observer.title',
            description: 'angular.architecture.observer.description',
            icon: 'visibility'
        },
        {
            title: 'angular.architecture.singleton.title',
            description: 'angular.architecture.singleton.description',
            icon: 'filter_1'
        },
        {
            title: 'angular.architecture.decorator.title',
            description: 'angular.architecture.decorator.description',
            icon: 'auto_awesome'
        },
        {
            title: 'angular.architecture.strategy.title',
            description: 'angular.architecture.strategy.description',
            icon: 'psychology'
        },
        {
            title: 'angular.architecture.adapter.title',
            description: 'angular.architecture.adapter.description',
            icon: 'settings_ethernet'
        },
        {
            title: 'angular.architecture.featureSlice.title',
            description: 'angular.architecture.featureSlice.description',
            icon: 'view_module'
        },
        {
            title: 'angular.architecture.cleanArchitecture.title',
            description: 'angular.architecture.cleanArchitecture.description',
            icon: 'architecture'
        },
        {
            title: 'angular.architecture.cqrs.title',
            description: 'angular.architecture.cqrs.description',
            icon: 'call_split'
        },
        {
            title: 'angular.architecture.eventDriven.title',
            description: 'angular.architecture.eventDriven.description',
            icon: 'event'
        },
        {
            title: 'angular.architecture.microFrontends.title',
            description: 'angular.architecture.microFrontends.description',
            icon: 'dashboard'
        },
        {
            title: 'angular.architecture.ddd.title',
            description: 'angular.architecture.ddd.description',
            icon: 'domain'
        },
        {
            title: 'angular.architecture.hexagonal.title',
            description: 'angular.architecture.hexagonal.description',
            icon: 'hexagon'
        },
        {
            title: 'angular.architecture.stateManagement.title',
            description: 'angular.architecture.stateManagement.description',
            icon: 'hub'
        },
        {
            title: 'angular.architecture.onion.title',
            description: 'angular.architecture.onion.description',
            icon: 'contrast'
        },
        {
            title: 'angular.architecture.mvvm.title',
            description: 'angular.architecture.mvvm.description',
            icon: 'view_in_ar'
        }
    ]);

    readonly detailedCodeExamples = signal<CodeExample[]>([
        {
            title: 'angular.codeExamples.signals.title',
            subtitle: 'angular.codeExamples.signals.subtitle',
            description: 'angular.codeExamples.signals.description',
            icon: 'sensors',
            language: 'typescript',
            code: `// Signal erstellen
const count = signal(0);
const user = signal({ name: 'Mike', age: 30 });

// Computed Signal
const doubled = computed(() => count() * 2);
const userName = computed(() => user().name);

// Signal aktualisieren
count.set(5);
count.update(value => value + 1);

// Effect für Seiteneffekte
effect(() => {
  console.log('Count changed:', count());
});`
        },
        {
            title: 'angular.codeExamples.component.title',
            subtitle: 'angular.codeExamples.component.subtitle',
            description: 'angular.codeExamples.component.description',
            icon: 'widgets',
            language: 'typescript',
            code: `import { Component, input, output, model } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="card">
      <h3>{{ name() }}</h3>
      <p>{{ email() }}</p>
      <button (click)="handleClick()">
        {{ buttonText() }}
      </button>
    </div>
  \`
})
export class UserCardComponent {
  // Input Signals (readonly)
  name = input.required<string>();
  email = input<string>('');
  buttonText = input('Click me');
  
  // Output Events
  userClicked = output<string>();
  
  // Two-way binding mit model()
  isActive = model<boolean>(false);
  
  handleClick() {
    this.userClicked.emit(this.name());
  }
}`
        },
        {
            title: 'angular.codeExamples.controlFlow.title',
            subtitle: 'angular.codeExamples.controlFlow.subtitle',
            description: 'angular.codeExamples.controlFlow.description',
            icon: 'alt_route',
            language: 'html',
            code: `<!-- @if Conditional -->
@if (isLoggedIn()) {
  <app-user-dashboard />
} @else if (isLoading()) {
  <app-loading-spinner />
} @else {
  <app-login-form />
}

<!-- @for Loop mit track -->
@for (user of users(); track user.id) {
  <app-user-card [user]="user" />
} @empty {
  <p>Keine Benutzer gefunden</p>
}

<!-- @switch Case -->
@switch (userRole()) {
  @case ('admin') {
    <app-admin-panel />
  }
  @case ('user') {
    <app-user-panel />
  }
  @default {
    <app-guest-panel />
  }
}`
        },
        {
            title: 'angular.codeExamples.service.title',
            subtitle: 'angular.codeExamples.service.subtitle',
            description: 'angular.codeExamples.service.description',
            icon: 'business_center',
            language: 'typescript',
            code: `import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  
  // Private state
  private usersSignal = signal<User[]>([]);
  
  // Public readonly state
  users = this.usersSignal.asReadonly();
  
  // Computed values
  activeUsers = computed(() => 
    this.users().filter(u => u.isActive)
  );
  
  loadUsers() {
    this.http.get<User[]>('/api/users')
      .subscribe(users => {
        this.usersSignal.set(users);
      });
  }
  
  addUser(user: User) {
    this.usersSignal.update(users => [...users, user]);
  }
}`
        },
        {
            title: 'angular.codeExamples.routing.title',
            subtitle: 'angular.codeExamples.routing.subtitle',
            description: 'angular.codeExamples.routing.description',
            icon: 'route',
            language: 'typescript',
            code: `import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    loadComponent: () => 
      import('./users/users.component')
        .then(m => m.UsersComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./users/user-detail.component')
            .then(m => m.UserDetailComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/admin.routes')
        .then(m => m.ADMIN_ROUTES)
  }
];`
        },
        {
            title: 'angular.codeExamples.forms.title',
            subtitle: 'angular.codeExamples.forms.subtitle',
            description: 'angular.codeExamples.forms.description',
            icon: 'edit_note',
            language: 'typescript',
            code: `import { FormControl, FormGroup, Validators } from '@angular/forms';

export class UserFormComponent {
  // Reactive Form mit Signals
  userForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    age: new FormControl(0, {
      validators: [Validators.min(18), Validators.max(100)],
      nonNullable: true
    })
  });
  
  // Form Status als Signal
  isValid = toSignal(
    this.userForm.statusChanges.pipe(
      map(status => status === 'VALID')
    )
  );
  
  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue();
      console.log('Form submitted:', formValue);
    }
  }
}`
        },
        {
            title: 'angular.codeExamples.rxjs.title',
            subtitle: 'angular.codeExamples.rxjs.subtitle',
            description: 'angular.codeExamples.rxjs.description',
            icon: 'stream',
            language: 'typescript',
            code: `import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { map, filter, debounceTime } from 'rxjs/operators';

export class SearchComponent {
  // Signal zu Observable
  searchTerm = signal('');
  searchTerm$ = toObservable(this.searchTerm);
  
  // Observable zu Signal
  results$ = this.searchTerm$.pipe(
    debounceTime(300),
    filter(term => term.length > 2),
    switchMap(term => this.searchService.search(term))
  );
  
  results = toSignal(this.results$, { 
    initialValue: [] 
  });
  
  // Kombination mehrerer Signals
  filteredResults = computed(() => {
    const results = this.results();
    const filter = this.filterSignal();
    return results.filter(r => r.category === filter);
  });
}`
        },
        {
            title: 'angular.codeExamples.guards.title',
            subtitle: 'angular.codeExamples.guards.subtitle',
            description: 'angular.codeExamples.guards.description',
            icon: 'shield',
            language: 'typescript',
            code: `import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// Functional Guard
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  return router.createUrlTree(['/login']);
};

// CanActivate mit Redirect
export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.hasRole('admin')) {
    return true;
  }
  
  return router.createUrlTree(['/unauthorized']);
};`
        },
        {
            title: 'angular.codeExamples.pipes.title',
            subtitle: 'angular.codeExamples.pipes.subtitle',
            description: 'angular.codeExamples.pipes.description',
            icon: 'transform',
            language: 'typescript',
            code: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  pure: true // Default, cachiert Ergebnisse
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search) return text;
    
    const pattern = new RegExp(search, 'gi');
    return text.replace(pattern, 
      match => \`<mark>\${match}</mark>\`
    );
  }
}

// Async Pipe mit Signals
@Component({
  template: \`
    <!-- Observable -->
    <div>{{ data$ | async }}</div>
    
    <!-- Signal (kein async pipe nötig) -->
    <div>{{ dataSignal() }}</div>
  \`
})`
        },
        {
            title: 'angular.codeExamples.interceptor.title',
            subtitle: 'angular.codeExamples.interceptor.subtitle',
            description: 'angular.codeExamples.interceptor.description',
            icon: 'sync_alt',
            language: 'typescript',
            code: `import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// Functional Interceptor (Angular v15+)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', \`Bearer \${token}\`)
    });
    return next(cloned);
  }
  
  return next(req);
};

// Error Interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      return throwError(() => error);
    })
  );
};

// Verwendung in app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ]
};`
        },
        {
            title: 'angular.codeExamples.directive.title',
            subtitle: 'angular.codeExamples.directive.subtitle',
            description: 'angular.codeExamples.directive.description',
            icon: 'extension',
            language: 'typescript',
            code: `import { Directive, ElementRef, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Signal Input
  appHighlight = input<string>('yellow');
  
  private el = inject(ElementRef);
  
  constructor() {
    // Effect reagiert auf Signal-Änderungen
    effect(() => {
      this.el.nativeElement.style.backgroundColor = 
        this.appHighlight();
    });
  }
}

// Host Bindings ohne Decorator
@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '[class.tooltip-active]': 'isVisible()'
  }
})
export class TooltipDirective {
  isVisible = signal(false);
  
  show() { this.isVisible.set(true); }
  hide() { this.isVisible.set(false); }
}`
        },
        {
            title: 'angular.codeExamples.deferrable.title',
            subtitle: 'angular.codeExamples.deferrable.subtitle',
            description: 'angular.codeExamples.deferrable.description',
            icon: 'hourglass_empty',
            language: 'html',
            code: `<!-- Lazy Loading mit @defer -->
@defer (on viewport) {
  <app-heavy-component />
} @placeholder {
  <div class="skeleton">Loading...</div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>Failed to load component</p>
}

<!-- Defer mit Bedingungen -->
@defer (on idle; on timer(5s)) {
  <app-analytics-widget />
}

<!-- Prefetch für bessere UX -->
@defer (on interaction; prefetch on idle) {
  <app-user-profile />
} @placeholder {
  <button>View Profile</button>
}

<!-- Verschachtelte Defers -->
@defer (on viewport) {
  <app-product-list />
  @defer (on interaction) {
    <app-product-filters />
  }
}`
        },
        {
            title: 'angular.codeExamples.viewChild.title',
            subtitle: 'angular.codeExamples.viewChild.subtitle',
            description: 'angular.codeExamples.viewChild.description',
            icon: 'pageview',
            language: 'typescript',
            code: `import { Component, viewChild, viewChildren } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: \`
    <app-child #first />
    <app-child #second />
    <input #searchInput />
  \`
})
export class ParentComponent {
  // Signal-basierte View Queries
  firstChild = viewChild<ChildComponent>('first');
  allChildren = viewChildren(ChildComponent);
  searchInput = viewChild<ElementRef>('searchInput');
  
  ngAfterViewInit() {
    // Type-safe Zugriff
    const child = this.firstChild();
    if (child) {
      child.doSomething();
    }
    
    // Alle Children
    console.log('Total children:', this.allChildren().length);
    
    // Native Element
    this.searchInput()?.nativeElement.focus();
  }
  
  // Effect für reaktive Updates
  constructor() {
    effect(() => {
      const count = this.allChildren().length;
      console.log('Children count changed:', count);
    });
  }
}`
        },
        {
            title: 'angular.codeExamples.hostBinding.title',
            subtitle: 'angular.codeExamples.hostBinding.subtitle',
            description: 'angular.codeExamples.hostBinding.description',
            icon: 'link',
            language: 'typescript',
            code: `@Component({
  selector: 'app-card',
  template: \`<ng-content></ng-content>\`,
  host: {
    // Class Bindings
    '[class.active]': 'isActive()',
    '[class.disabled]': 'isDisabled()',
    '[class.highlighted]': 'highlighted()',
    
    // Style Bindings
    '[style.background-color]': 'bgColor()',
    '[style.padding.px]': 'padding()',
    
    // Attribute Bindings
    '[attr.role]': '"region"',
    '[attr.aria-label]': 'ariaLabel()',
    
    // Event Listeners
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleEnter()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class CardComponent {
  isActive = signal(false);
  isDisabled = input<boolean>(false);
  highlighted = model<boolean>(false);
  bgColor = input<string>('#fff');
  padding = input<number>(16);
  ariaLabel = input<string>('Card');
  
  handleClick(event: MouseEvent) {
    if (!this.isDisabled()) {
      this.isActive.update(v => !v);
    }
  }
  
  handleEnter() {
    console.log('Enter pressed');
  }
  
  onMouseEnter() {
    this.highlighted.set(true);
  }
  
  onMouseLeave() {
    this.highlighted.set(false);
  }
}`
        },
        {
            title: 'angular.codeExamples.contentChild.title',
            subtitle: 'angular.codeExamples.contentChild.subtitle',
            description: 'angular.codeExamples.contentChild.description',
            icon: 'vertical_split',
            language: 'typescript',
            code: `import { Component, contentChild, contentChildren } from '@angular/core';

// Tabs Component mit Content Projection
@Component({
  selector: 'app-tabs',
  template: \`
    <div class="tab-headers">
      @for (tab of tabs(); track tab) {
        <button (click)="selectTab(tab)">
          {{ tab.title }}
        </button>
      }
    </div>
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
  \`
})
export class TabsComponent {
  tabs = contentChildren(TabComponent);
  activeTab = contentChild(TabComponent, { read: TabComponent });
  
  selectTab(tab: TabComponent) {
    this.tabs().forEach(t => t.active.set(false));
    tab.active.set(true);
  }
}

@Component({
  selector: 'app-tab',
  template: \`
    <div [hidden]="!active()">
      <ng-content></ng-content>
    </div>
  \`
})
export class TabComponent {
  title = input.required<string>();
  active = signal(false);
}`
        },
        {
            title: 'angular.codeExamples.testing.title',
            subtitle: 'angular.codeExamples.testing.subtitle',
            description: 'angular.codeExamples.testing.description',
            icon: 'bug_report',
            language: 'typescript',
            code: `import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });
  
  it('should update signal on button click', () => {
    // Arrange
    expect(component.count()).toBe(0);
    
    // Act
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    
    // Assert
    expect(component.count()).toBe(1);
  });
  
  it('should test computed values', () => {
    component.count.set(5);
    expect(component.doubled()).toBe(10);
  });
});

// Service Testing mit Signals
describe('UserService', () => {
  let service: UserService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });
  
  it('should update users signal', () => {
    const mockUsers = [{ id: 1, name: 'Test' }];
    service.setUsers(mockUsers);
    expect(service.users()).toEqual(mockUsers);
  });
});`
        },
        {
            title: 'angular.codeExamples.resource.title',
            subtitle: 'angular.codeExamples.resource.subtitle',
            description: 'angular.codeExamples.resource.description',
            icon: 'cloud_download',
            language: 'typescript',
            code: `import { resource } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  template: \`
    @if (users.isLoading()) {
      <app-loading-spinner />
    }
    
    @if (users.error()) {
      <div class="error">{{ users.error() }}</div>
    }
    
    @if (users.value(); as userList) {
      @for (user of userList; track user.id) {
        <app-user-card [user]="user" />
      }
    }
    
    <button (click)="users.reload()">Reload</button>
  \`
})
export class UserListComponent {
  private http = inject(HttpClient);
  searchTerm = signal('');
  
  // Resource API - deklarative HTTP-Anfragen
  users = resource({
    request: () => ({ search: this.searchTerm() }),
    loader: ({ request }) => 
      this.http.get<User[]>(\`/api/users?q=\${request.search}\`)
  });
  
  // Computed auf Basis von Resource
  userCount = computed(() => 
    this.users.value()?.length ?? 0
  );
  
  onSearch(term: string) {
    this.searchTerm.set(term); // Triggert automatisch reload
  }
}`
        },
        {
            title: 'angular.codeExamples.animations.title',
            subtitle: 'angular.codeExamples.animations.subtitle',
            description: 'angular.codeExamples.animations.description',
            icon: 'animation',
            language: 'typescript',
            code: `import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-animated-box',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate('200ms ease-in', 
          style({ opacity: 0, transform: 'translateY(-20px)' })
        )
      ])
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100px)' }),
          stagger('50ms', [
            animate('300ms ease-out', 
              style({ opacity: 1, transform: 'translateX(0)' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: \`
    @if (isVisible()) {
      <div @fadeIn class="box">Animated Content</div>
    }
    
    <div [@expandCollapse]="isExpanded() ? 'expanded' : 'collapsed'">
      <ng-content></ng-content>
    </div>
    
    <div @listAnimation>
      @for (item of items(); track item.id) {
        <div class="list-item">{{ item.name }}</div>
      }
    </div>
  \`
})
export class AnimatedBoxComponent {
  isVisible = signal(true);
  isExpanded = signal(false);
  items = signal<Item[]>([]);
}`
        },
        {
            title: 'angular.codeExamples.stateManagement.title',
            subtitle: 'angular.codeExamples.stateManagement.subtitle',
            description: 'angular.codeExamples.stateManagement.description',
            icon: 'storage',
            language: 'typescript',
            code: `import { Injectable, signal, computed } from '@angular/core';

// Zentraler State Store mit Signals
@Injectable({ providedIn: 'root' })
export class AppStore {
  // Private State
  private _users = signal<User[]>([]);
  private _selectedUserId = signal<string | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  
  // Public Readonly State
  readonly users = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  
  // Computed/Derived State
  readonly selectedUser = computed(() => {
    const id = this._selectedUserId();
    return this._users().find(u => u.id === id);
  });
  
  readonly activeUsers = computed(() => 
    this._users().filter(u => u.isActive)
  );
  
  readonly userCount = computed(() => 
    this._users().length
  );
  
  // Actions
  loadUsers(users: User[]) {
    this._users.set(users);
    this._loading.set(false);
    this._error.set(null);
  }
  
  selectUser(id: string) {
    this._selectedUserId.set(id);
  }
  
  addUser(user: User) {
    this._users.update(users => [...users, user]);
  }
  
  updateUser(id: string, updates: Partial<User>) {
    this._users.update(users => 
      users.map(u => u.id === id ? { ...u, ...updates } : u)
    );
  }
  
  deleteUser(id: string) {
    this._users.update(users => users.filter(u => u.id !== id));
  }
  
  setLoading(loading: boolean) {
    this._loading.set(loading);
  }
  
  setError(error: string | null) {
    this._error.set(error);
  }
}`
        },
        {
            title: 'angular.codeExamples.httpSignals.title',
            subtitle: 'angular.codeExamples.httpSignals.subtitle',
            description: 'angular.codeExamples.httpSignals.description',
            icon: 'http',
            language: 'typescript',
            code: `import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-data-fetcher',
  template: \`
    <input #search (input)="searchTerm.set(search.value)" />
    
    @if (isLoading()) {
      <p>Loading...</p>
    } @else if (error()) {
      <p class="error">{{ error() }}</p>
    } @else if (data(); as results) {
      <div>Found {{ results.length }} results</div>
      @for (item of results; track item.id) {
        <div>{{ item.name }}</div>
      }
    }
  \`
})
export class DataFetcherComponent {
  private http = inject(HttpClient);
  
  searchTerm = signal('');
  
  // Observable Pipeline
  private search$ = toObservable(this.searchTerm).pipe(
    debounceTime(300),
    filter(term => term.length > 2),
    switchMap(term => 
      this.http.get<Item[]>(\`/api/search?q=\${term}\`).pipe(
        catchError(error => {
          this.errorSignal.set(error.message);
          return of([]);
        })
      )
    )
  );
  
  // Observable zu Signal konvertieren
  data = toSignal(this.search$, { initialValue: [] });
  
  // Loading und Error States
  private errorSignal = signal<string | null>(null);
  error = this.errorSignal.asReadonly();
  
  isLoading = computed(() => {
    const term = this.searchTerm();
    const results = this.data();
    return term.length > 2 && results.length === 0 && !this.error();
  });
  
  // Manueller HTTP Call mit Signal Update
  async loadData(id: string) {
    try {
      const result = await firstValueFrom(
        this.http.get<Item>(\`/api/items/\${id}\`)
      );
      this.dataSignal.set(result);
    } catch (error) {
      this.errorSignal.set('Failed to load data');
    }
  }
  
  private dataSignal = signal<Item | null>(null);
}`
        },
        {
            title: 'angular.codeExamples.performance.title',
            subtitle: 'angular.codeExamples.performance.subtitle',
            description: 'angular.codeExamples.performance.description',
            icon: 'speed',
            language: 'typescript',
            code: `import { Component, ChangeDetectionStrategy, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-optimized-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- TrackBy für effizientes Rendering -->
    @for (item of items(); track trackByItemId($index, item)) {
      <app-item-card 
        [item]="item"
        (delete)="removeItem(item.id)"
      />
    }
    
    <!-- Virtuelles Scrolling für große Listen -->
    <cdk-virtual-scroll-viewport itemSize="50">
      @for (item of virtualItems(); track item.id) {
        <div class="item">{{ item.name }}</div>
      }
    </cdk-virtual-scroll-viewport>
    
    <!-- Lazy Loading mit @defer -->
    @defer (on viewport; prefetch on idle) {
      <app-heavy-chart [data]="chartData()" />
    } @placeholder {
      <div class="chart-placeholder"></div>
    }
  \`,
  host: {
    '[class.optimized]': 'true'
  }
})
export class OptimizedListComponent {
  items = signal<Item[]>([]);
  virtualItems = signal<Item[]>([]);
  chartData = signal<ChartData[]>([]);
  
  // TrackBy Function für bessere Performance
  trackByItemId: TrackByFunction<Item> = (index, item) => item.id;
  
  // Computed für gefilterte Listen (gecacht)
  filteredItems = computed(() => {
    const filter = this.filterSignal();
    return this.items().filter(item => 
      item.name.includes(filter)
    );
  });
  
  // Memoization mit computed
  expensiveCalculation = computed(() => {
    return this.items().reduce((sum, item) => sum + item.price, 0);
  });
  
  removeItem(id: string) {
    // Immutable Update für OnPush Change Detection
    this.items.update(current => current.filter(item => item.id !== id));
  }
  
  private filterSignal = signal('');
}`
        }
    ]);

    navigateHome(): void {
        this.router.navigate(['/']);
    }
}
