import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { FeatureDetailDialogComponent } from './feature-detail-dialog/feature-detail-dialog';
import { BestPracticeDialogComponent } from './best-practice-dialog/best-practice-dialog';
import { AdvancedTopicDialogComponent } from './advanced-topic-dialog/advanced-topic-dialog';
import { ArchitecturePatternDialogComponent } from './architecture-pattern-dialog/architecture-pattern-dialog';

interface BestPractice {
  category: string;
  description?: string;
  icon: string;
  items: string[];
  color?: string;
  detailTitle?: string;
  explanation?: string;
  codeExample?: string;
  detailedItems?: Array<{
    title: string;
    description: string;
    example?: string;
  }>;
  benefits?: string[];
  antiPatterns?: string[];
}

interface AngularFeature {
  title: string;
  description: string;
  topics?: string[];
  icon: string;
  color: string;
  detailTitle?: string;
  explanation?: string;
  codeExample?: string;
  useCases?: string[];
  benefits?: string[];
}

interface AdvancedTopic {
  title: string;
  description: string;
  icon: string;
  topics: string[];
  color?: string;
  detailTitle?: string;
  explanation?: string;
  codeExample?: string;
  detailedItems?: Array<{
    title: string;
    description: string;
    example?: string;
  }>;
  benefits?: string[];
  antiPatterns?: string[];
}

interface ArchitecturePattern {
  title: string;
  description: string;
  icon: string;
  detailTitle?: string;
  explanation?: string;
  codeExample?: string;
  benefits?: string[];
  useCases?: string[];
  implementation?: string[];
  challenges?: string[];
}

interface CodeExample {
  title: string;
  subtitle: string;
  description: string;
  code: string;
  icon: string;
  language: string;
}

interface RealWorldPattern {
  title: string;
  description: string;
  code: string;
  icon: string;
  useCases: string[];
}

interface DevelopmentTool {
  title: string;
  description: string;
  icon: string;
  setup: string;
  config?: string;
}

interface DeploymentStrategy {
  title: string;
  description: string;
  icon: string;
  steps: string[];
  code?: string;
}

interface AccessibilityPattern {
  title: string;
  description: string;
  icon: string;
  example: string;
  tips: string[];
}

interface CommonPitfall {
  title: string;
  description: string;
  icon: string;
  problem: string;
  solution: string;
}

interface Resource {
  title: string;
  description: string;
  icon: string;
  links: { name: string; url: string; }[];
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
    MatDialogModule,
    TranslatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './angular-summary.html',
  styleUrl: './angular-summary.scss'
})
export class AngularSummaryComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  readonly version = signal('20');
  readonly panelOpenState = signal(false);

  readonly coreFeatures = signal<AngularFeature[]>([
    {
      title: 'angular.features.signals.title',
      description: 'angular.features.signals.description',
      icon: 'sensors',
      color: 'primary',
      detailTitle: 'angular.features.signals.detailTitle',
      explanation: 'angular.features.signals.explanation',
      codeExample: `// Signal erstellen
const count = signal(0);
const doubled = computed(() => count() * 2);

// Signal aktualisieren
count.set(5);        // Wert setzen
count.update(c => c + 1);  // Wert aktualisieren

// Effekt (Side-Effects)
effect(() => {
  console.log('Count:', count());
  console.log('Doubled:', doubled());
});`,
      benefits: [
        'angular.features.signals.benefit1',
        'angular.features.signals.benefit2',
        'angular.features.signals.benefit3'
      ],
      useCases: [
        'angular.features.signals.useCase1',
        'angular.features.signals.useCase2',
        'angular.features.signals.useCase3'
      ]
    },
    {
      title: 'angular.features.standalone.title',
      description: 'angular.features.standalone.description',
      icon: 'widgets',
      color: 'accent',
      detailTitle: 'angular.features.standalone.detailTitle',
      explanation: 'angular.features.standalone.explanation',
      codeExample: `@Component({
  selector: 'app-my-component',
  standalone: true,  // Standalone Component
  imports: [CommonModule, MatButtonModule],
  template: \`<button mat-button>Click</button>\`
})
export class MyComponent {
  // Keine NgModule erforderlich!
}

// Bootstrap
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});`,
      benefits: [
        'angular.features.standalone.benefit1',
        'angular.features.standalone.benefit2',
        'angular.features.standalone.benefit3'
      ],
      useCases: [
        'angular.features.standalone.useCase1',
        'angular.features.standalone.useCase2',
        'angular.features.standalone.useCase3'
      ]
    },
    {
      title: 'angular.features.inject.title',
      description: 'angular.features.inject.description',
      icon: 'input',
      color: 'primary',
      detailTitle: 'angular.features.inject.detailTitle',
      explanation: 'angular.features.inject.explanation',
      codeExample: `@Component({
  selector: 'app-user-profile',
  standalone: true
})
export class UserProfileComponent {
  // inject() statt constructor DI
  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // Optional mit Default
  private config = inject(CONFIG_TOKEN, { 
    optional: true 
  }) ?? defaultConfig;

  // Self-only (nicht von Eltern)
  private localService = inject(LocalService, { 
    self: true 
  });
}`,
      benefits: [
        'angular.features.inject.benefit1',
        'angular.features.inject.benefit2',
        'angular.features.inject.benefit3'
      ],
      useCases: [
        'angular.features.inject.useCase1',
        'angular.features.inject.useCase2',
        'angular.features.inject.useCase3'
      ]
    },
    {
      title: 'angular.features.controlFlow.title',
      description: 'angular.features.controlFlow.description',
      icon: 'alt_route',
      color: 'accent',
      detailTitle: 'angular.features.controlFlow.detailTitle',
      explanation: 'angular.features.controlFlow.explanation',
      codeExample: `<!-- @if - Konditionelles Rendering -->
@if (user(); as u) {
  <p>Hallo {{ u.name }}</p>
} @else if (loading()) {
  <p>Lädt...</p>
} @else {
  <p>Nicht angemeldet</p>
}

<!-- @for - Listen -->
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <p>Keine Elemente</p>
}

<!-- @switch - Mehrere Fälle -->
@switch (status()) {
  @case ('loading') { <spinner/> }
  @case ('error') { <error/> }
  @case ('success') { <data/> }
  @default { <empty/> }
}`,
      benefits: [
        'angular.features.controlFlow.benefit1',
        'angular.features.controlFlow.benefit2',
        'angular.features.controlFlow.benefit3'
      ],
      useCases: [
        'angular.features.controlFlow.useCase1',
        'angular.features.controlFlow.useCase2',
        'angular.features.controlFlow.useCase3'
      ]
    },
    {
      title: 'angular.features.deferrable.title',
      description: 'angular.features.deferrable.description',
      icon: 'hourglass_empty',
      color: 'primary',
      detailTitle: 'angular.features.deferrable.detailTitle',
      explanation: 'angular.features.deferrable.explanation',
      codeExample: `<!-- Lazy Loading bei Sichtbarkeit -->
@defer (on viewport) {
  <heavy-component />
} @placeholder {
  <div>Laden...</div>
} @loading (minimum 500ms) {
  <spinner />
} @error {
  <error-message />
}

<!-- Defer bei Interaktion -->
@defer (on interaction) {
  <comments-section />
}

<!-- Defer nach Timer -->
@defer (on timer(2s)) {
  <analytics-widget />
}

<!-- Defer bei Idle -->
@defer (on idle) {
  <newsletter-signup />
}`,
      benefits: [
        'angular.features.deferrable.benefit1',
        'angular.features.deferrable.benefit2',
        'angular.features.deferrable.benefit3'
      ],
      useCases: [
        'angular.features.deferrable.useCase1',
        'angular.features.deferrable.useCase2',
        'angular.features.deferrable.useCase3'
      ]
    },
    {
      title: 'angular.features.inputOutput.title',
      description: 'angular.features.inputOutput.description',
      icon: 'swap_horiz',
      color: 'accent',
      detailTitle: 'angular.features.inputOutput.detailTitle',
      explanation: 'angular.features.inputOutput.explanation',
      codeExample: `@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <button (click)="increment()">+</button>
    <span>{{ count() }}</span>
  \`
})
export class CounterComponent {
  // Input Signal (readonly von außen)
  count = input<number>(0);
  
  // Input mit Transformation
  disabled = input(false, {
    transform: (value: boolean | string) => 
      typeof value === 'string' ? value === '' : value
  });

  // Input mit Alias
  userName = input.required<string>({ 
    alias: 'user-name' 
  });

  // Output (EventEmitter)
  countChange = output<number>();

  increment(): void {
    this.countChange.emit(this.count() + 1);
  }
}`,
      benefits: [
        'angular.features.inputOutput.benefit1',
        'angular.features.inputOutput.benefit2',
        'angular.features.inputOutput.benefit3'
      ],
      useCases: [
        'angular.features.inputOutput.useCase1',
        'angular.features.inputOutput.useCase2',
        'angular.features.inputOutput.useCase3'
      ]
    },
    {
      title: 'angular.features.viewQueries.title',
      description: 'angular.features.viewQueries.description',
      icon: 'pageview',
      color: 'primary',
      detailTitle: 'angular.features.viewQueries.detailTitle',
      explanation: 'angular.features.viewQueries.explanation',
      codeExample: `@Component({
  selector: 'app-parent',
  standalone: true,
  template: \`
    <input #nameInput />
    <app-child />
    <app-child />
  \`
})
export class ParentComponent {
  // Einzelnes Element (Signal)
  nameInput = viewChild<ElementRef>('nameInput');
  
  // Required ViewChild
  requiredChild = viewChild.required(ChildComponent);

  // Mehrere Elemente (Signal Array)
  children = viewChildren(ChildComponent);

  ngAfterViewInit() {
    // Automatisch Signal
    console.log(this.nameInput()?.nativeElement);
    console.log(this.children().length);
    
    // Required wirft Error wenn nicht gefunden
    this.requiredChild().doSomething();
  }
}`,
      benefits: [
        'angular.features.viewQueries.benefit1',
        'angular.features.viewQueries.benefit2',
        'angular.features.viewQueries.benefit3'
      ],
      useCases: [
        'angular.features.viewQueries.useCase1',
        'angular.features.viewQueries.useCase2',
        'angular.features.viewQueries.useCase3'
      ]
    },
    {
      title: 'angular.features.model.title',
      description: 'angular.features.model.description',
      icon: 'sync_alt',
      color: 'accent',
      detailTitle: 'angular.features.model.detailTitle',
      explanation: 'angular.features.model.explanation',
      codeExample: `// Child Component
@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <button (click)="decrement()">-</button>
    <span>{{ value() }}</span>
    <button (click)="increment()">+</button>
  \`
})
export class CounterComponent {
  // Two-Way Binding Signal
  value = model<number>(0);

  increment(): void {
    this.value.update(v => v + 1);
  }

  decrement(): void {
    this.value.update(v => v - 1);
  }
}

// Parent Template
<app-counter [(value)]="count" />`,
      benefits: [
        'angular.features.model.benefit1',
        'angular.features.model.benefit2',
        'angular.features.model.benefit3'
      ],
      useCases: [
        'angular.features.model.useCase1',
        'angular.features.model.useCase2',
        'angular.features.model.useCase3'
      ]
    },
    {
      title: 'angular.features.onPush.title',
      description: 'angular.features.onPush.description',
      icon: 'update',
      color: 'primary',
      detailTitle: 'angular.features.onPush.detailTitle',
      explanation: 'angular.features.onPush.explanation',
      codeExample: `@Component({
  selector: 'app-user-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @for (user of users(); track user.id) {
      <div>{{ user.name }}</div>
    }
  \`
})
export class UserListComponent {
  users = signal<User[]>([]);

  constructor() {
    // Signal updates triggern automatisch
    // Change Detection bei OnPush
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      // Signal update = CD ausgelöst
      this.users.set(data);
    });
  }
}`,
      benefits: [
        'angular.features.onPush.benefit1',
        'angular.features.onPush.benefit2',
        'angular.features.onPush.benefit3'
      ],
      useCases: [
        'angular.features.onPush.useCase1',
        'angular.features.onPush.useCase2',
        'angular.features.onPush.useCase3'
      ]
    },
    {
      title: 'angular.features.httpClient.title',
      description: 'angular.features.httpClient.description',
      icon: 'cloud',
      color: 'accent',
      detailTitle: 'angular.features.httpClient.detailTitle',
      explanation: 'angular.features.httpClient.explanation',
      codeExample: `@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com';

  // Observable Pattern
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(\`\${this.baseUrl}/users\`);
  }

  // Mit toSignal() für Signals
  users = toSignal(this.getUsers(), { 
    initialValue: [] 
  });

  // POST Request
  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      \`\${this.baseUrl}/users\`, 
      user,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}`,
      benefits: [
        'angular.features.httpClient.benefit1',
        'angular.features.httpClient.benefit2',
        'angular.features.httpClient.benefit3'
      ],
      useCases: [
        'angular.features.httpClient.useCase1',
        'angular.features.httpClient.useCase2',
        'angular.features.httpClient.useCase3'
      ]
    },
    {
      title: 'angular.features.resource.title',
      description: 'angular.features.resource.description',
      icon: 'inventory',
      color: 'primary',
      detailTitle: 'angular.features.resource.detailTitle',
      explanation: 'angular.features.resource.explanation',
      codeExample: `@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: \`
    @if (userResource.isLoading()) {
      <spinner />
    } @else if (userResource.error()) {
      <error>{{ userResource.error() }}</error>
    } @else {
      <profile [user]="userResource.value()" />
    }
  \`
})
export class UserProfileComponent {
  userId = signal(1);

  // Resource API
  userResource = resource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => 
      this.userService.getUser(request.id)
  });

  // Reaktiv: userId ändern lädt neue Daten
  changeUser(newId: number): void {
    this.userId.set(newId);
  }
}`,
      benefits: [
        'angular.features.resource.benefit1',
        'angular.features.resource.benefit2',
        'angular.features.resource.benefit3'
      ],
      useCases: [
        'angular.features.resource.useCase1',
        'angular.features.resource.useCase2',
        'angular.features.resource.useCase3'
      ]
    },
    {
      title: 'angular.features.forms.title',
      description: 'angular.features.forms.description',
      icon: 'article',
      color: 'accent',
      detailTitle: 'angular.features.forms.detailTitle',
      explanation: 'angular.features.forms.explanation',
      codeExample: `@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" />
      @if (userForm.controls.name.invalid) {
        <error>Name erforderlich</error>
      }
      <input formControlName="email" type="email" />
      <button type="submit" [disabled]="userForm.invalid">
        Speichern
      </button>
    </form>
  \`
})
export class UserFormComponent {
  private fb = inject(FormBuilder);

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.min(0), Validators.max(120)]]
  });

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value as User;
      console.log(user);
    }
  }
}`,
      benefits: [
        'angular.features.forms.benefit1',
        'angular.features.forms.benefit2',
        'angular.features.forms.benefit3'
      ],
      useCases: [
        'angular.features.forms.useCase1',
        'angular.features.forms.useCase2',
        'angular.features.forms.useCase3'
      ]
    },
    {
      title: 'angular.features.router.title',
      description: 'angular.features.router.description',
      icon: 'route',
      color: 'primary',
      detailTitle: 'angular.features.router.detailTitle',
      explanation: 'angular.features.router.explanation',
      codeExample: `// Routes Definition
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'users/:id', 
    component: UserDetailComponent,
    resolve: { user: userResolver }
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./admin/routes')
  }
];

// Component
@Component({
  selector: 'app-user-detail',
  standalone: true
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  userId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    )
  );

  navigateBack(): void {
    this.router.navigate(['/users']);
  }
}`,
      benefits: [
        'angular.features.router.benefit1',
        'angular.features.router.benefit2',
        'angular.features.router.benefit3'
      ],
      useCases: [
        'angular.features.router.useCase1',
        'angular.features.router.useCase2',
        'angular.features.router.useCase3'
      ]
    },
    {
      title: 'angular.features.material.title',
      description: 'angular.features.material.description',
      icon: 'palette',
      color: 'accent',
      detailTitle: 'angular.features.material.detailTitle',
      explanation: 'angular.features.material.explanation',
      codeExample: `@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: \`
    <mat-toolbar color="primary">
      <span>Dashboard</span>
    </mat-toolbar>

    <mat-card>
      <mat-card-header>
        <mat-card-title>Statistiken</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Benutzer: {{ userCount() }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">
          <mat-icon>refresh</mat-icon>
          Aktualisieren
        </button>
      </mat-card-actions>
    </mat-card>
  \`
})
export class DashboardComponent {
  userCount = signal(0);
}`,
      benefits: [
        'angular.features.material.benefit1',
        'angular.features.material.benefit2',
        'angular.features.material.benefit3'
      ],
      useCases: [
        'angular.features.material.useCase1',
        'angular.features.material.useCase2',
        'angular.features.material.useCase3'
      ]
    },
    {
      title: 'angular.features.devtools.title',
      description: 'angular.features.devtools.description',
      icon: 'bug_report',
      color: 'primary',
      detailTitle: 'angular.features.devtools.detailTitle',
      explanation: 'angular.features.devtools.explanation',
      codeExample: `// Installieren
// Chrome Extension: Angular DevTools

// Features:
// 1. Component Tree Inspector
//    - Komponenten-Hierarchie visualisieren
//    - Props und State inspizieren
//    - Signal-Werte live beobachten

// 2. Profiler
//    - Performance-Analyse
//    - Change Detection Zyklen
//    - Render-Zeiten messen

// 3. Injector Tree
//    - Dependency Injection visualisieren
//    - Services und Provider tracken

// 4. Router Tree
//    - Route-Konfiguration anzeigen
//    - Navigation-Events tracken

// Debug-Modus aktivieren
enableDebugTools(rootComponent);`,
      benefits: [
        'angular.features.devtools.benefit1',
        'angular.features.devtools.benefit2',
        'angular.features.devtools.benefit3'
      ],
      useCases: [
        'angular.features.devtools.useCase1',
        'angular.features.devtools.useCase2',
        'angular.features.devtools.useCase3'
      ]
    },
    {
      title: 'angular.features.vite.title',
      description: 'angular.features.vite.description',
      icon: 'flash_on',
      color: 'accent',
      detailTitle: 'angular.features.vite.detailTitle',
      explanation: 'angular.features.vite.explanation',
      codeExample: `// angular.json (Standard ab Angular 17+)
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/my-app",
            "index": "src/index.html",
            "browser": "src/main.ts"
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server"
        }
      }
    }
  }
}

// Vorteile:
// - Instant HMR (Hot Module Replacement)
// - Schnelle Dev Server Starts
// - ESBuild für Production
// - Optimierte Bundle-Größen`,
      benefits: [
        'angular.features.vite.benefit1',
        'angular.features.vite.benefit2',
        'angular.features.vite.benefit3'
      ],
      useCases: [
        'angular.features.vite.useCase1',
        'angular.features.vite.useCase2',
        'angular.features.vite.useCase3'
      ]
    }
  ]);

  readonly bestPractices = signal<BestPractice[]>([
    {
      category: 'angular.bestPractices.components.title',
      icon: 'view_module',
      color: 'primary',
      items: [
        'angular.bestPractices.components.item1',
        'angular.bestPractices.components.item2',
        'angular.bestPractices.components.item3',
        'angular.bestPractices.components.item4',
        'angular.bestPractices.components.item5',
        'angular.bestPractices.components.item6',
        'angular.bestPractices.components.item7',
        'angular.bestPractices.components.item8'
      ],
      detailTitle: 'angular.bestPractices.components.detailTitle',
      explanation: 'angular.bestPractices.components.explanation',
      codeExample: `@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule],
  template: \`
    <mat-card>
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
    </mat-card>
  \`
})
export class UserCardComponent {
  // Input Signals
  user = input.required<User>();
  
  // Output Events
  userClicked = output<User>();
  
  // Computed Values
  displayName = computed(() => 
    \`\${this.user().firstName} \${this.user().lastName}\`
  );
}`,
      benefits: [
        'angular.bestPractices.components.benefit1',
        'angular.bestPractices.components.benefit2',
        'angular.bestPractices.components.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.components.antiPattern1',
        'angular.bestPractices.components.antiPattern2',
        'angular.bestPractices.components.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.state.title',
      icon: 'storage',
      color: 'accent',
      items: [
        'angular.bestPractices.state.item1',
        'angular.bestPractices.state.item2',
        'angular.bestPractices.state.item3',
        'angular.bestPractices.state.item4',
        'angular.bestPractices.state.item5',
        'angular.bestPractices.state.item6'
      ],
      detailTitle: 'angular.bestPractices.state.detailTitle',
      explanation: 'angular.bestPractices.state.explanation',
      codeExample: `// Service für State Management
@Injectable({ providedIn: 'root' })
export class UserStateService {
  // Private Signal für internen State
  private _users = signal<User[]>([]);
  
  // Public readonly Signal
  readonly users = this._users.asReadonly();
  
  // Computed Signals
  readonly activeUsers = computed(() => 
    this._users().filter(u => u.active)
  );
  
  readonly userCount = computed(() => 
    this._users().length
  );
  
  // State Updates
  addUser(user: User): void {
    this._users.update(users => [...users, user]);
  }
  
  removeUser(id: number): void {
    this._users.update(users => 
      users.filter(u => u.id !== id)
    );
  }
  
  updateUser(id: number, changes: Partial<User>): void {
    this._users.update(users =>
      users.map(u => u.id === id ? { ...u, ...changes } : u)
    );
  }
}`,
      benefits: [
        'angular.bestPractices.state.benefit1',
        'angular.bestPractices.state.benefit2',
        'angular.bestPractices.state.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.state.antiPattern1',
        'angular.bestPractices.state.antiPattern2',
        'angular.bestPractices.state.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.templates.title',
      icon: 'code',
      color: 'primary',
      items: [
        'angular.bestPractices.templates.item1',
        'angular.bestPractices.templates.item2',
        'angular.bestPractices.templates.item3',
        'angular.bestPractices.templates.item4',
        'angular.bestPractices.templates.item5'
      ],
      detailTitle: 'angular.bestPractices.templates.detailTitle',
      explanation: 'angular.bestPractices.templates.explanation',
      codeExample: `<!-- Neue Control Flow Syntax verwenden -->
@if (user(); as u) {
  <div class="user-info">
    <h3>{{ u.name }}</h3>
    <p>{{ u.email }}</p>
  </div>
} @else {
  <p>Kein Benutzer gefunden</p>
}

<!-- @for mit track für Performance -->
@for (item of items(); track item.id) {
  <div class="item">
    {{ item.name }}
  </div>
} @empty {
  <p>Keine Elemente vorhanden</p>
}

<!-- Async Pipes vermeiden, Signals nutzen -->
<!-- ❌ Alt -->
<div>{{ user$ | async }}</div>

<!-- ✅ Neu -->
<div>{{ user() }}</div>

<!-- @defer für Lazy Loading -->
@defer (on viewport) {
  <heavy-component />
} @placeholder {
  <loading-spinner />
}`,
      benefits: [
        'angular.bestPractices.templates.benefit1',
        'angular.bestPractices.templates.benefit2',
        'angular.bestPractices.templates.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.templates.antiPattern1',
        'angular.bestPractices.templates.antiPattern2',
        'angular.bestPractices.templates.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.services.title',
      icon: 'business_center',
      color: 'accent',
      items: [
        'angular.bestPractices.services.item1',
        'angular.bestPractices.services.item2',
        'angular.bestPractices.services.item3',
        'angular.bestPractices.services.item4',
        'angular.bestPractices.services.item5'
      ],
      detailTitle: 'angular.bestPractices.services.detailTitle',
      explanation: 'angular.bestPractices.services.explanation',
      codeExample: `@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.example.com';
  
  // Signal-basierte API
  private _data = signal<Data[]>([]);
  readonly data = this._data.asReadonly();
  
  // Loading State
  private _loading = signal(false);
  readonly loading = this._loading.asReadonly();
  
  // Error Handling
  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();
  
  loadData(): void {
    this._loading.set(true);
    this._error.set(null);
    
    this.http.get<Data[]>(\`\${this.apiUrl}/data\`)
      .pipe(
        catchError(err => {
          this._error.set(err.message);
          return of([]);
        }),
        finalize(() => this._loading.set(false))
      )
      .subscribe(data => this._data.set(data));
  }
  
  // Idempotente Methoden
  createData(item: Data): Observable<Data> {
    return this.http.post<Data>(
      \`\${this.apiUrl}/data\`, 
      item
    );
  }
}`,
      benefits: [
        'angular.bestPractices.services.benefit1',
        'angular.bestPractices.services.benefit2',
        'angular.bestPractices.services.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.services.antiPattern1',
        'angular.bestPractices.services.antiPattern2',
        'angular.bestPractices.services.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.performance.title',
      icon: 'speed',
      color: 'primary',
      items: [
        'angular.bestPractices.performance.item1',
        'angular.bestPractices.performance.item2',
        'angular.bestPractices.performance.item3',
        'angular.bestPractices.performance.item4',
        'angular.bestPractices.performance.item5',
        'angular.bestPractices.performance.item6',
        'angular.bestPractices.performance.item7'
      ],
      detailTitle: 'angular.bestPractices.performance.detailTitle',
      explanation: 'angular.bestPractices.performance.explanation',
      codeExample: `@Component({
  selector: 'app-high-performance',
  standalone: true,
  // OnPush für optimale Performance
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- trackBy für Listen -->
    @for (item of items(); track item.id) {
      <div>{{ item.name }}</div>
    }
    
    <!-- Lazy Loading mit @defer -->
    @defer (on viewport) {
      <expensive-component />
    } @placeholder (minimum 500ms) {
      <skeleton-loader />
    }
    
    <!-- Preload kritischer Daten -->
    @defer (on idle; prefetch on idle) {
      <analytics-component />
    }
  \`
})
export class HighPerformanceComponent {
  // Signals statt Observables
  items = signal<Item[]>([]);
  
  // Computed für abgeleitete Werte
  filteredItems = computed(() => 
    this.items().filter(i => i.active)
  );
  
  // Virtual Scrolling für große Listen
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;
}`,
      benefits: [
        'angular.bestPractices.performance.benefit1',
        'angular.bestPractices.performance.benefit2',
        'angular.bestPractices.performance.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.performance.antiPattern1',
        'angular.bestPractices.performance.antiPattern2',
        'angular.bestPractices.performance.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.typescript.title',
      icon: 'code_blocks',
      color: 'accent',
      items: [
        'angular.bestPractices.typescript.item1',
        'angular.bestPractices.typescript.item2',
        'angular.bestPractices.typescript.item3',
        'angular.bestPractices.typescript.item4',
        'angular.bestPractices.typescript.item5',
        'angular.bestPractices.typescript.item6'
      ],
      detailTitle: 'angular.bestPractices.typescript.detailTitle',
      explanation: 'angular.bestPractices.typescript.explanation',
      codeExample: `// Strikte TypeScript Konfiguration
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitReturns": true
  }
}

// Interfaces für Typsicherheit
interface User {
  readonly id: number;
  name: string;
  email: string;
  role: UserRole;
}

type UserRole = 'admin' | 'user' | 'guest';

// Generics für wiederverwendbare Typen
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Type Guards
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}

// Readonly Arrays
readonly users: readonly User[] = [];`,
      benefits: [
        'angular.bestPractices.typescript.benefit1',
        'angular.bestPractices.typescript.benefit2',
        'angular.bestPractices.typescript.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.typescript.antiPattern1',
        'angular.bestPractices.typescript.antiPattern2',
        'angular.bestPractices.typescript.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.accessibility.title',
      icon: 'accessibility',
      color: 'primary',
      items: [
        'angular.bestPractices.accessibility.item1',
        'angular.bestPractices.accessibility.item2',
        'angular.bestPractices.accessibility.item3',
        'angular.bestPractices.accessibility.item4',
        'angular.bestPractices.accessibility.item5'
      ],
      detailTitle: 'angular.bestPractices.accessibility.detailTitle',
      explanation: 'angular.bestPractices.accessibility.explanation',
      codeExample: `<!-- Semantic HTML verwenden -->
<button 
  type="button"
  [attr.aria-label]="'Benutzer löschen: ' + user().name"
  [attr.aria-pressed]="isSelected()"
  (click)="deleteUser()">
  <mat-icon>delete</mat-icon>
  Löschen
</button>

<!-- Form Accessibility -->
<div class="form-field">
  <label for="email">E-Mail</label>
  <input 
    id="email"
    type="email"
    [attr.aria-invalid]="emailInvalid()"
    [attr.aria-describedby]="emailInvalid() ? 'email-error' : null"
    [(ngModel)]="email">
  
  @if (emailInvalid()) {
    <span id="email-error" role="alert">
      Bitte gültige E-Mail eingeben
    </span>
  }
</div>

<!-- Live Regions für Statusmeldungen -->
<div 
  role="status"
  aria-live="polite"
  aria-atomic="true">
  {{ statusMessage() }}
</div>

<!-- Keyboard Navigation -->
<div 
  role="button"
  tabindex="0"
  (click)="handleClick()"
  (keydown.enter)="handleClick()"
  (keydown.space)="handleClick()">
  Klickbar
</div>`,
      benefits: [
        'angular.bestPractices.accessibility.benefit1',
        'angular.bestPractices.accessibility.benefit2',
        'angular.bestPractices.accessibility.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.accessibility.antiPattern1',
        'angular.bestPractices.accessibility.antiPattern2',
        'angular.bestPractices.accessibility.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.testing.title',
      icon: 'science',
      color: 'accent',
      items: [
        'angular.bestPractices.testing.item1',
        'angular.bestPractices.testing.item2',
        'angular.bestPractices.testing.item3',
        'angular.bestPractices.testing.item4',
        'angular.bestPractices.testing.item5'
      ],
      detailTitle: 'angular.bestPractices.testing.detailTitle',
      explanation: 'angular.bestPractices.testing.explanation',
      codeExample: `describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent] // Standalone
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });
  
  it('should display user name', () => {
    // Arrange
    const testUser = { id: 1, name: 'Test' };
    fixture.componentRef.setInput('user', testUser);
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const element = fixture.nativeElement;
    expect(element.textContent).toContain('Test');
  });
  
  it('should emit event on click', () => {
    // Arrange
    let emittedUser: User | undefined;
    component.userClicked.subscribe(u => emittedUser = u);
    
    // Act
    component.onClick();
    
    // Assert
    expect(emittedUser).toBeDefined();
  });
});

// Service Testing
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should load users', () => {
    service.loadUsers();
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    
    req.flush([{ id: 1, name: 'Test' }]);
    expect(service.users().length).toBe(1);
  });
});`,
      benefits: [
        'angular.bestPractices.testing.benefit1',
        'angular.bestPractices.testing.benefit2',
        'angular.bestPractices.testing.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.testing.antiPattern1',
        'angular.bestPractices.testing.antiPattern2',
        'angular.bestPractices.testing.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.errorHandling.title',
      icon: 'error_outline',
      color: 'primary',
      items: [
        'angular.bestPractices.errorHandling.item1',
        'angular.bestPractices.errorHandling.item2',
        'angular.bestPractices.errorHandling.item3',
        'angular.bestPractices.errorHandling.item4'
      ],
      detailTitle: 'angular.bestPractices.errorHandling.detailTitle',
      explanation: 'angular.bestPractices.errorHandling.explanation',
      codeExample: `// Global Error Handler
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private logger = inject(LoggerService);
  private notifier = inject(NotificationService);
  
  handleError(error: Error): void {
    // Log Error
    this.logger.error('Global error:', error);
    
    // User Notification
    this.notifier.showError(
      'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    );
    
    // Sende an Monitoring Service
    if (environment.production) {
      this.sendToMonitoring(error);
    }
  }
}

// HTTP Error Interceptor
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = \`Error: \${error.error.message}\`;
      } else {
        // Server-side error
        errorMessage = \`Error Code: \${error.status}\\nMessage: \${error.message}\`;
      }
      
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};

// Component Error Boundary
@Component({
  selector: 'app-error-boundary',
  template: \`
    @if (error()) {
      <div class="error">
        <h3>Etwas ist schiefgelaufen</h3>
        <button (click)="retry()">Erneut versuchen</button>
      </div>
    } @else {
      <ng-content />
    }
  \`
})
export class ErrorBoundaryComponent {
  error = signal<Error | null>(null);
  
  retry(): void {
    this.error.set(null);
  }
}`,
      benefits: [
        'angular.bestPractices.errorHandling.benefit1',
        'angular.bestPractices.errorHandling.benefit2',
        'angular.bestPractices.errorHandling.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.errorHandling.antiPattern1',
        'angular.bestPractices.errorHandling.antiPattern2',
        'angular.bestPractices.errorHandling.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.security.title',
      icon: 'shield',
      color: 'accent',
      items: [
        'angular.bestPractices.security.item1',
        'angular.bestPractices.security.item2',
        'angular.bestPractices.security.item3',
        'angular.bestPractices.security.item4',
        'angular.bestPractices.security.item5'
      ],
      detailTitle: 'angular.bestPractices.security.detailTitle',
      explanation: 'angular.bestPractices.security.explanation',
      codeExample: `// DomSanitizer für sichere HTML-Inhalte
@Component({
  selector: 'app-safe-content',
  template: \`<div [innerHTML]="safeHtml()"></div>\`
})
export class SafeContentComponent {
  private sanitizer = inject(DomSanitizer);
  
  rawHtml = signal('<script>alert("XSS")</script>');
  
  safeHtml = computed(() => 
    this.sanitizer.sanitize(
      SecurityContext.HTML, 
      this.rawHtml()
    )
  );
}

// HTTP Security Headers
export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  const secureReq = req.clone({
    setHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  });
  return next(secureReq);
};

// Content Security Policy
// index.html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">

// Sichere Authentifizierung
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenKey = 'auth_token';
  
  login(credentials: Credentials): Observable<void> {
    return this.http.post<AuthResponse>('/api/login', credentials)
      .pipe(
        tap(response => {
          // Sichere Token-Speicherung (httpOnly Cookie bevorzugt)
          sessionStorage.setItem(this.tokenKey, response.token);
        }),
        map(() => void 0)
      );
  }
  
  // CSRF Token Handling
  getCsrfToken(): string {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] || '';
  }
}`,
      benefits: [
        'angular.bestPractices.security.benefit1',
        'angular.bestPractices.security.benefit2',
        'angular.bestPractices.security.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.security.antiPattern1',
        'angular.bestPractices.security.antiPattern2',
        'angular.bestPractices.security.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.codeOrganization.title',
      icon: 'folder_open',
      color: 'primary',
      items: [
        'angular.bestPractices.codeOrganization.item1',
        'angular.bestPractices.codeOrganization.item2',
        'angular.bestPractices.codeOrganization.item3',
        'angular.bestPractices.codeOrganization.item4',
        'angular.bestPractices.codeOrganization.item5'
      ],
      detailTitle: 'angular.bestPractices.codeOrganization.detailTitle',
      explanation: 'angular.bestPractices.codeOrganization.explanation',
      codeExample: `// Projektstruktur
src/
  app/
    core/              // Singleton Services
      services/
        auth.service.ts
        api.service.ts
      guards/
        auth.guard.ts
      interceptors/
        auth.interceptor.ts
    
    shared/            // Wiederverwendbare Komponenten
      components/
        button/
          button.component.ts
          button.component.html
          button.component.scss
      pipes/
        format-date.pipe.ts
      directives/
        tooltip.directive.ts
    
    features/          // Feature Modules
      users/
        components/
          user-list/
          user-detail/
        services/
          user.service.ts
        models/
          user.model.ts
        user.routes.ts
      
      products/
        components/
        services/
        product.routes.ts
    
    app.routes.ts
    app.component.ts

// Barrel Exports (index.ts)
export * from './components/button.component';
export * from './pipes/format-date.pipe';
export * from './models/user.model';`,
      benefits: [
        'angular.bestPractices.codeOrganization.benefit1',
        'angular.bestPractices.codeOrganization.benefit2',
        'angular.bestPractices.codeOrganization.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.codeOrganization.antiPattern1',
        'angular.bestPractices.codeOrganization.antiPattern2',
        'angular.bestPractices.codeOrganization.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.dependency.title',
      icon: 'account_tree',
      color: 'accent',
      items: [
        'angular.bestPractices.dependency.item1',
        'angular.bestPractices.dependency.item2',
        'angular.bestPractices.dependency.item3',
        'angular.bestPractices.dependency.item4'
      ],
      detailTitle: 'angular.bestPractices.dependency.detailTitle',
      explanation: 'angular.bestPractices.dependency.explanation',
      codeExample: `// inject() statt Constructor Injection
@Component({
  selector: 'app-user-list',
  standalone: true
})
export class UserListComponent {
  // Services mit inject()
  private userService = inject(UserService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  
  // Optional Dependencies
  private analytics = inject(AnalyticsService, { 
    optional: true 
  });
  
  // Self-only (nicht von Parent)
  private localConfig = inject(LOCAL_CONFIG, { 
    self: true 
  });
}

// Injection Tokens
export const API_URL = new InjectionToken<string>('API_URL');
export const FEATURE_FLAGS = new InjectionToken<FeatureFlags>('FEATURE_FLAGS');

// Provider in Bootstrap
bootstrapApplication(AppComponent, {
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: FEATURE_FLAGS, useValue: { enableBeta: true } },
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
});

// Factory Provider
export function configFactory(http: HttpClient): Observable<Config> {
  return http.get<Config>('/api/config');
}

export const CONFIG_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: configFactory,
  deps: [HttpClient],
  multi: true
};`,
      benefits: [
        'angular.bestPractices.dependency.benefit1',
        'angular.bestPractices.dependency.benefit2',
        'angular.bestPractices.dependency.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.dependency.antiPattern1',
        'angular.bestPractices.dependency.antiPattern2',
        'angular.bestPractices.dependency.antiPattern3'
      ]
    },
    {
      category: 'angular.bestPractices.buildDeploy.title',
      icon: 'rocket_launch',
      color: 'primary',
      items: [
        'angular.bestPractices.buildDeploy.item1',
        'angular.bestPractices.buildDeploy.item2',
        'angular.bestPractices.buildDeploy.item3',
        'angular.bestPractices.buildDeploy.item4',
        'angular.bestPractices.buildDeploy.item5'
      ],
      detailTitle: 'angular.bestPractices.buildDeploy.detailTitle',
      explanation: 'angular.bestPractices.buildDeploy.explanation',
      codeExample: `// angular.json - Production Build Konfiguration
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true
            }
          }
        }
      }
    }
  }
}

// Environment Files
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com',
  enableDebug: false,
  analytics: {
    trackingId: 'UA-XXXXX-Y'
  }
};

// CI/CD Pipeline (.github/workflows/deploy.yml)
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - run: npm ci
      - run: npm run test -- --watch=false
      - run: npm run build -- --configuration production
      
      - name: Deploy to GitHub Pages
        run: |
          npx angular-cli-ghpages \\
            --dir=dist/my-app/browser \\
            --no-silent

// Docker Deployment
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/my-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80`,
      benefits: [
        'angular.bestPractices.buildDeploy.benefit1',
        'angular.bestPractices.buildDeploy.benefit2',
        'angular.bestPractices.buildDeploy.benefit3'
      ],
      antiPatterns: [
        'angular.bestPractices.buildDeploy.antiPattern1',
        'angular.bestPractices.buildDeploy.antiPattern2',
        'angular.bestPractices.buildDeploy.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.routing.detailTitle',
      explanation: 'angular.advanced.routing.explanation',
      codeExample: `// Advanced Routing Configuration
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    canActivate: [authGuard],
    canMatch: [roleGuard('admin')]
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    resolve: { user: userResolver },
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

// Functional Guard
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// Resolver
export const userResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  return userService.getUser(route.params['id']);
};`,
      benefits: [
        'angular.advanced.routing.benefit1',
        'angular.advanced.routing.benefit2',
        'angular.advanced.routing.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.routing.antiPattern1',
        'angular.advanced.routing.antiPattern2',
        'angular.advanced.routing.antiPattern3'
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
      ],
      color: 'teal',
      detailTitle: 'angular.advanced.forms.detailTitle',
      explanation: 'angular.advanced.forms.explanation',
      codeExample: `// Reactive Forms with Typed Forms
interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number>;
  address: FormGroup<AddressForm>;
}

@Component({
  selector: 'app-user-form',
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" />
      @if (form.controls.name.errors?.['required']) {
        <span>Name is required</span>
      }
      
      <div formGroupName="address">
        <input formControlName="street" />
        <input formControlName="city" />
      </div>
      
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  \`
})
export class UserFormComponent {
  form = new FormGroup<UserForm>({
    name: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailExistsValidator()]
    }),
    age: new FormControl(0, { nonNullable: true }),
    address: new FormGroup<AddressForm>({
      street: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true })
    })
  });
  
  onSubmit() {
    if (this.form.valid) {
      const value = this.form.getRawValue(); // Fully typed!
      console.log(value);
    }
  }
}

// Custom Async Validator
function emailExistsValidator(): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const http = inject(HttpClient);
    return http.get(\`/api/check-email?email=\${control.value}\`)
      .pipe(
        map(exists => exists ? { emailTaken: true } : null),
        catchError(() => of(null))
      );
  };
}`,
      benefits: [
        'angular.advanced.forms.benefit1',
        'angular.advanced.forms.benefit2',
        'angular.advanced.forms.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.forms.antiPattern1',
        'angular.advanced.forms.antiPattern2',
        'angular.advanced.forms.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.rxjs.detailTitle',
      explanation: 'angular.advanced.rxjs.explanation',
      codeExample: `// Advanced RxJS Patterns
@Injectable({ providedIn: 'root' })
export class DataService {
  private destroy$ = new Subject<void>();
  private refreshTrigger$ = new Subject<void>();
  
  // Hot Observable with shareReplay
  readonly users$ = this.refreshTrigger$.pipe(
    startWith(null),
    switchMap(() => this.http.get<User[]>('/api/users')),
    shareReplay({ bufferSize: 1, refCount: true }),
    catchError(error => {
      console.error(error);
      return of([]);
    })
  );
  
  // Combining Streams
  readonly searchResults$ = combineLatest([
    this.searchTerm$,
    this.filters$
  ]).pipe(
    debounceTime(300),
    distinctUntilChanged((prev, curr) => 
      JSON.stringify(prev) === JSON.stringify(curr)
    ),
    switchMap(([term, filters]) => 
      this.search(term, filters)
    ),
    takeUntil(this.destroy$)
  );
  
  // Error Handling with retry
  loadData() {
    return this.http.get('/api/data').pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => 
          timer(retryCount * 1000)
      }),
      catchError(error => {
        this.errorHandler.handle(error);
        return throwError(() => error);
      })
    );
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
      benefits: [
        'angular.advanced.rxjs.benefit1',
        'angular.advanced.rxjs.benefit2',
        'angular.advanced.rxjs.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.rxjs.antiPattern1',
        'angular.advanced.rxjs.antiPattern2',
        'angular.advanced.rxjs.antiPattern3'
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
      ],
      color: 'teal',
      detailTitle: 'angular.advanced.changeDetection.detailTitle',
      explanation: 'angular.advanced.changeDetection.explanation',
      codeExample: `// Advanced Change Detection
@Component({
  selector: 'app-optimized',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h2>{{ title() }}</h2>
    <p>Count: {{ count() }}</p>
    
    @for (item of items(); track item.id) {
      <app-item [data]="item" />
    }
  \`
})
export class OptimizedComponent {
  // Signals trigger change detection automatically
  title = signal('Optimized Component');
  count = signal(0);
  items = signal<Item[]>([]);
  
  private cdr = inject(ChangeDetectorRef);
  
  // Manual change detection when needed
  loadData() {
    this.http.get<Item[]>('/api/items')
      .subscribe(data => {
        this.items.set(data); // Signals auto-detect
      });
  }
  
  // Detach/Reattach for complex scenarios
  runExpensiveOperation() {
    this.cdr.detach();
    
    // Heavy computation
    const result = this.compute();
    
    this.count.set(result);
    this.cdr.reattach();
    this.cdr.markForCheck();
  }
}

// Zone-less with Signals
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
};`,
      benefits: [
        'angular.advanced.changeDetection.benefit1',
        'angular.advanced.changeDetection.benefit2',
        'angular.advanced.changeDetection.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.changeDetection.antiPattern1',
        'angular.advanced.changeDetection.antiPattern2',
        'angular.advanced.changeDetection.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.animations.detailTitle',
      explanation: 'angular.advanced.animations.explanation',
      codeExample: `// Advanced Animations
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-animated',
  animations: [
    // Route Transitions
    trigger('routeAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({ position: 'absolute', width: '100%' })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' })
        ], { optional: true }),
        query(':leave', [
          animate('300ms ease-out', 
            style({ opacity: 0, transform: 'translateX(-100%)' })
          )
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-in',
            style({ opacity: 1, transform: 'translateX(0)' })
          )
        ], { optional: true })
      ])
    ]),
    
    // List Animations with Stagger
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('50ms', [
            animate('300ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ]),
    
    // State-based Animation
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', 
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class AnimatedComponent {
  isExpanded = signal(false);
  items = signal<string[]>([]);
}`,
      benefits: [
        'angular.advanced.animations.benefit1',
        'angular.advanced.animations.benefit2',
        'angular.advanced.animations.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.animations.antiPattern1',
        'angular.advanced.animations.antiPattern2',
        'angular.advanced.animations.antiPattern3'
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
      ],
      color: 'teal',
      detailTitle: 'angular.advanced.testing.detailTitle',
      explanation: 'angular.advanced.testing.explanation',
      codeExample: `// Advanced Testing Patterns
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);
    
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });
  
  it('should load users on init', fakeAsync(() => {
    const mockUsers = [{ id: 1, name: 'John' }];
    userService.getUsers.and.returnValue(of(mockUsers));
    
    component.ngOnInit();
    tick();
    
    expect(component.users()).toEqual(mockUsers);
  }));
  
  it('should handle errors', () => {
    const error = new Error('Failed');
    userService.getUsers.and.returnValue(throwError(() => error));
    
    component.loadUsers();
    
    expect(component.error()).toBe(error.message);
  });
});

// HTTP Testing
describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting()]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should fetch data', () => {
    service.getData().subscribe(data => {
      expect(data).toEqual({ id: 1 });
    });
    
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1 });
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});`,
      benefits: [
        'angular.advanced.testing.benefit1',
        'angular.advanced.testing.benefit2',
        'angular.advanced.testing.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.testing.antiPattern1',
        'angular.advanced.testing.antiPattern2',
        'angular.advanced.testing.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.ssr.detailTitle',
      explanation: 'angular.advanced.ssr.explanation',
      codeExample: `// Server-Side Rendering Setup
// app.config.server.ts
export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

// Platform-aware Code
@Component({
  selector: 'app-data',
  template: \`
    @if (isPlatformBrowser) {
      <div>{{ data() }}</div>
    } @else {
      <div>Loading...</div>
    }
  \`
})
export class DataComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isPlatformBrowser = isPlatformBrowser(this.platformId);
  data = signal<string>('');
  
  ngOnInit() {
    if (this.isPlatformBrowser) {
      // Browser-only code
      this.loadFromLocalStorage();
    }
  }
  
  loadFromLocalStorage() {
    const stored = localStorage.getItem('data');
    this.data.set(stored || '');
  }
}

// Transfer State
@Injectable({ providedIn: 'root' })
export class DataService {
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  
  private readonly DATA_KEY = makeStateKey<Data>('data');
  
  loadData() {
    // Check if data exists in transfer state
    const stored = this.transferState.get(this.DATA_KEY, null);
    
    if (stored) {
      // Use transferred data
      return of(stored);
    }
    
    // Fetch from server
    return this.http.get<Data>('/api/data').pipe(
      tap(data => {
        if (isPlatformServer(this.platformId)) {
          // Store for transfer to browser
          this.transferState.set(this.DATA_KEY, data);
        }
      })
    );
  }
}`,
      benefits: [
        'angular.advanced.ssr.benefit1',
        'angular.advanced.ssr.benefit2',
        'angular.advanced.ssr.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.ssr.antiPattern1',
        'angular.advanced.ssr.antiPattern2',
        'angular.advanced.ssr.antiPattern3'
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
      ],
      color: 'teal',
      detailTitle: 'angular.advanced.i18n.detailTitle',
      explanation: 'angular.advanced.i18n.explanation',
      codeExample: `// Runtime i18n with Signal-based Service
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang = signal<'de' | 'en' | 'fr' | 'it'>('de');
  
  private translations = {
    de: () => import('./translations/de'),
    en: () => import('./translations/en'),
    fr: () => import('./translations/fr'),
    it: () => import('./translations/it')
  };
  
  private currentTranslations = signal<Record<string, string>>({});
  
  readonly lang = this.currentLang.asReadonly();
  
  constructor() {
    this.loadTranslations(this.currentLang());
  }
  
  async setLanguage(lang: typeof this.currentLang) {
    this.currentLang.set(lang);
    await this.loadTranslations(lang);
  }
  
  private async loadTranslations(lang: string) {
    const module = await this.translations[lang]();
    this.currentTranslations.set(module.default);
  }
  
  translate(key: string): string {
    return this.currentTranslations()[key] || key;
  }
}

// Translation Pipe
@Pipe({ 
  name: 'translate',
  standalone: true,
  pure: true
})
export class TranslatePipe implements PipeTransform {
  private service = inject(TranslationService);
  
  transform(key: string): string {
    return this.service.translate(key);
  }
}

// Usage
@Component({
  template: \`
    <h1>{{ 'welcome.title' | translate }}</h1>
    <button (click)="switchLang()">
      {{ 'change.language' | translate }}
    </button>
  \`
})
export class AppComponent {
  private translationService = inject(TranslationService);
  
  switchLang() {
    const current = this.translationService.lang();
    const next = current === 'de' ? 'en' : 'de';
    this.translationService.setLanguage(next);
  }
}`,
      benefits: [
        'angular.advanced.i18n.benefit1',
        'angular.advanced.i18n.benefit2',
        'angular.advanced.i18n.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.i18n.antiPattern1',
        'angular.advanced.i18n.antiPattern2',
        'angular.advanced.i18n.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.security.detailTitle',
      explanation: 'angular.advanced.security.explanation',
      codeExample: `// Security Best Practices
@Component({
  selector: 'app-secure',
  template: \`
    <!-- Safe: Angular auto-escapes -->
    <div>{{ userInput }}</div>
    
    <!-- Sanitize when needed -->
    <div [innerHTML]="sanitizedHtml"></div>
    
    <!-- Safe binding -->
    <a [href]="sanitizedUrl">Link</a>
    
    <!-- NEVER do this -->
    <!-- <div [innerHTML]="unsafeHtml"></div> -->
  \`
})
export class SecureComponent {
  private sanitizer = inject(DomSanitizer);
  
  userInput = signal('');
  rawHtml = signal('<p>Content</p>');
  
  sanitizedHtml = computed(() => 
    this.sanitizer.sanitize(
      SecurityContext.HTML,
      this.rawHtml()
    )
  );
  
  sanitizedUrl = computed(() => 
    this.sanitizer.sanitize(
      SecurityContext.URL,
      this.externalUrl()
    )
  );
}

// HTTP Security - CSRF Protection
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([csrfInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    )
  ]
};

// Content Security Policy (index.html)
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
    script-src 'self'; 
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:">

// Secure Storage
class SecureStorageService {
  // NEVER store sensitive data in localStorage
  // Use sessionStorage for temporary data
  // Use HttpOnly cookies for tokens
  
  storeToken(token: string) {
    // Send to backend to set HttpOnly cookie
    this.http.post('/api/auth/token', { token })
      .subscribe();
  }
}`,
      benefits: [
        'angular.advanced.security.benefit1',
        'angular.advanced.security.benefit2',
        'angular.advanced.security.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.security.antiPattern1',
        'angular.advanced.security.antiPattern2',
        'angular.advanced.security.antiPattern3'
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
      ],
      color: 'teal',
      detailTitle: 'angular.advanced.directives.detailTitle',
      explanation: 'angular.advanced.directives.explanation',
      codeExample: `// Advanced Custom Directives
// Structural Directive
@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective {
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);
  private authService = inject(AuthService);
  
  @Input() set appPermission(role: string) {
    this.viewContainer.clear();
    
    if (this.authService.hasRole(role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

// Attribute Directive with Host Binding
@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '[style.background-color]': 'backgroundColor',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  backgroundColor = '';
  
  onMouseEnter() {
    this.backgroundColor = this.appHighlight;
  }
  
  onMouseLeave() {
    this.backgroundColor = '';
  }
}

// Directive Composition
@Directive({
  selector: '[appTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkTooltip,
      inputs: ['cdkTooltip: appTooltip']
    }
  ]
})
export class TooltipDirective {}

// Usage
@Component({
  template: \`
    <div *appPermission="'admin'">Admin Only</div>
    <p appHighlight="lightblue">Hover me</p>
    <button appTooltip="Click here">Hover</button>
  \`
})`,
      benefits: [
        'angular.advanced.directives.benefit1',
        'angular.advanced.directives.benefit2',
        'angular.advanced.directives.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.directives.antiPattern1',
        'angular.advanced.directives.antiPattern2',
        'angular.advanced.directives.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.pipes.detailTitle',
      explanation: 'angular.advanced.pipes.explanation',
      codeExample: `// Advanced Custom Pipes
// Pure Pipe (cached)
@Pipe({
  name: 'fileSize',
  standalone: true,
  pure: true
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} \${sizes[i]}\`;
  }
}

// Impure Pipe (always recalculates)
@Pipe({
  name: 'sort',
  standalone: true,
  pure: false
})
export class SortPipe implements PipeTransform {
  transform<T>(array: T[], key: keyof T): T[] {
    if (!array) return [];
    return [...array].sort((a, b) => 
      a[key] > b[key] ? 1 : -1
    );
  }
}

// Async Pipe Alternative with Signals
@Pipe({
  name: 'async',
  standalone: true,
  pure: false
})
export class SignalAsyncPipe implements PipeTransform {
  private subscription?: Subscription;
  private value = signal<any>(null);
  
  transform<T>(observable: Observable<T>): T | null {
    if (!this.subscription) {
      this.subscription = observable.subscribe(
        value => this.value.set(value)
      );
    }
    return this.value();
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

// Usage
@Component({
  template: \`
    <p>{{ 1048576 | fileSize }}</p>
    <p>{{ users | sort:'name' }}</p>
    <p>{{ data$ | async }}</p>
  \`
})`,
      benefits: [
        'angular.advanced.pipes.benefit1',
        'angular.advanced.pipes.benefit2',
        'angular.advanced.pipes.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.pipes.antiPattern1',
        'angular.advanced.pipes.antiPattern2',
        'angular.advanced.pipes.antiPattern3'
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
      ],
      color: 'teal',
      detailTitle: 'angular.advanced.httpInterceptors.detailTitle',
      explanation: 'angular.advanced.httpInterceptors.explanation',
      codeExample: `// Functional HTTP Interceptors
// Auth Interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: \`Bearer \${token}\`
      }
    });
  }
  
  return next(req);
};

// Loading Interceptor
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.show();
  
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};

// Error Handling Interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(ErrorHandlerService);
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      } else if (error.status === 500) {
        errorHandler.handleError(error);
      }
      
      return throwError(() => error);
    })
  );
};

// Retry Interceptor
export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const maxRetries = 3;
  
  return next(req).pipe(
    retry({
      count: maxRetries,
      delay: (error, retryCount) => {
        if (error.status === 500) {
          return timer(retryCount * 1000);
        }
        return throwError(() => error);
      }
    })
  );
};

// Configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        errorInterceptor,
        retryInterceptor
      ])
    )
  ]
};`,
      benefits: [
        'angular.advanced.httpInterceptors.benefit1',
        'angular.advanced.httpInterceptors.benefit2',
        'angular.advanced.httpInterceptors.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.httpInterceptors.antiPattern1',
        'angular.advanced.httpInterceptors.antiPattern2',
        'angular.advanced.httpInterceptors.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.stateManagement.detailTitle',
      explanation: 'angular.advanced.stateManagement.explanation',
      codeExample: `// Signal-based State Management
@Injectable({ providedIn: 'root' })
export class TodoStore {
  // Private state
  private readonly todos = signal<Todo[]>([]);
  private readonly filter = signal<'all' | 'active' | 'completed'>('all');
  
  // Public readonly signals
  readonly allTodos = this.todos.asReadonly();
  readonly currentFilter = this.filter.asReadonly();
  
  // Computed signals
  readonly filteredTodos = computed(() => {
    const todos = this.todos();
    const filter = this.filter();
    
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  });
  
  readonly stats = computed(() => ({
    total: this.todos().length,
    active: this.todos().filter(t => !t.completed).length,
    completed: this.todos().filter(t => t.completed).length
  }));
  
  // Actions
  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.todos.update(todos => [...todos, newTodo]);
  }
  
  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(t => t.id === id 
        ? { ...t, completed: !t.completed }
        : t
      )
    );
  }
  
  removeTodo(id: number) {
    this.todos.update(todos => 
      todos.filter(t => t.id !== id)
    );
  }
  
  setFilter(filter: typeof this.filter) {
    this.filter.set(filter);
  }
}

// Usage in Component
@Component({
  selector: 'app-todos',
  template: \`
    <div>Total: {{ store.stats().total }}</div>
    <div>Active: {{ store.stats().active }}</div>
    
    @for (todo of store.filteredTodos(); track todo.id) {
      <div>{{ todo.title }}</div>
    }
  \`
})
export class TodosComponent {
  readonly store = inject(TodoStore);
}`,
      benefits: [
        'angular.advanced.stateManagement.benefit1',
        'angular.advanced.stateManagement.benefit2',
        'angular.advanced.stateManagement.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.stateManagement.antiPattern1',
        'angular.advanced.stateManagement.antiPattern2',
        'angular.advanced.stateManagement.antiPattern3'
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
      ],
      color: 'teal',
      detailTitle: 'angular.advanced.moduleFederation.detailTitle',
      explanation: 'angular.advanced.moduleFederation.explanation',
      codeExample: `// Module Federation Configuration
// Host App (angular.json)
{
  "moduleFederation": {
    "remotes": {
      "mfe1": "http://localhost:4201/remoteEntry.js",
      "mfe2": "http://localhost:4202/remoteEntry.js"
    }
  }
}

// Remote App (angular.json)
{
  "moduleFederation": {
    "name": "mfe1",
    "filename": "remoteEntry.js",
    "exposes": {
      "./Component": "./src/app/my-component/my-component.ts",
      "./Routes": "./src/app/my-routes.ts"
    },
    "shared": {
      "@angular/core": { singleton: true, strictVersion: true },
      "@angular/common": { singleton: true, strictVersion: true },
      "@angular/router": { singleton: true, strictVersion: true }
    }
  }
}

// Loading Remote Module
const routes: Routes = [
  {
    path: 'mfe1',
    loadChildren: () => 
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Routes'
      })
  }
];

// Loading Remote Component
@Component({
  selector: 'app-shell',
  template: \`
    <ng-container #remoteComponent></ng-container>
  \`
})
export class ShellComponent implements OnInit {
  @ViewChild('remoteComponent', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;
  
  async ngOnInit() {
    const component = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Component'
    });
    
    this.viewContainer.createComponent(component);
  }
}`,
      benefits: [
        'angular.advanced.moduleFederation.benefit1',
        'angular.advanced.moduleFederation.benefit2',
        'angular.advanced.moduleFederation.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.moduleFederation.antiPattern1',
        'angular.advanced.moduleFederation.antiPattern2',
        'angular.advanced.moduleFederation.antiPattern3'
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
      ],
      color: 'cyan',
      detailTitle: 'angular.advanced.pwa.detailTitle',
      explanation: 'angular.advanced.pwa.explanation',
      codeExample: `// Progressive Web App Setup
// ngsw-config.json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2)"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/**"],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1h",
        "strategy": "freshness"
      }
    }
  ]
}

// Service Worker Usage
@Injectable({ providedIn: 'root' })
export class PwaService {
  private swUpdate = inject(SwUpdate);
  
  constructor() {
    if (this.swUpdate.isEnabled) {
      this.checkForUpdates();
      this.handleUpdates();
    }
  }
  
  private checkForUpdates() {
    interval(6 * 60 * 60 * 1000) // Check every 6 hours
      .subscribe(() => this.swUpdate.checkForUpdate());
  }
  
  private handleUpdates() {
    this.swUpdate.versionUpdates
      .pipe(
        filter(evt => evt.type === 'VERSION_READY')
      )
      .subscribe(() => {
        if (confirm('New version available. Load it?')) {
          window.location.reload();
        }
      });
  }
}

// Push Notifications
@Injectable({ providedIn: 'root' })
export class PushService {
  private swPush = inject(SwPush);
  
  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.vapidPublicKey
    })
    .then(sub => {
      // Send subscription to backend
      this.http.post('/api/subscribe', sub).subscribe();
    });
  }
  
  listenToNotifications() {
    this.swPush.messages.subscribe(message => {
      console.log('Notification:', message);
    });
  }
}`,
      benefits: [
        'angular.advanced.pwa.benefit1',
        'angular.advanced.pwa.benefit2',
        'angular.advanced.pwa.benefit3'
      ],
      antiPatterns: [
        'angular.advanced.pwa.antiPattern1',
        'angular.advanced.pwa.antiPattern2',
        'angular.advanced.pwa.antiPattern3'
      ]
    }
  ]);

  readonly architecturePatterns = signal<ArchitecturePattern[]>([
    {
      title: 'angular.architecture.smartDumb.title',
      description: 'angular.architecture.smartDumb.description',
      icon: 'account_tree',
      detailTitle: 'angular.architecture.smartDumb.detailTitle',
      explanation: 'angular.architecture.smartDumb.explanation',
      codeExample: `// Smart Component (Container)
@Component({
  selector: 'app-user-list-container',
  template: \`
    <app-user-list
      [users]="users()"
      [loading]="loading()"
      (userSelected)="onUserSelected($event)"
      (searchChanged)="onSearchChanged($event)">
    </app-user-list>
  \`
})
export class UserListContainerComponent {
  private userService = inject(UserService);
  users = signal<User[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.userService.getUsers().subscribe(users => {
      this.users.set(users);
      this.loading.set(false);
    });
  }

  onUserSelected(user: User) {
    this.router.navigate(['/users', user.id]);
  }

  onSearchChanged(query: string) {
    // Business logic
  }
}

// Dumb Component (Presentational)
@Component({
  selector: 'app-user-list',
  template: \`
    <div class="user-list">
      @if (loading) {
        <mat-spinner></mat-spinner>
      } @else {
        @for (user of users; track user.id) {
          <mat-card (click)="userSelected.emit(user)">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
          </mat-card>
        }
      }
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users = input.required<User[]>();
  loading = input<boolean>(false);
  userSelected = output<User>();
  searchChanged = output<string>();
}`,
      benefits: [
        'angular.architecture.smartDumb.benefit1',
        'angular.architecture.smartDumb.benefit2',
        'angular.architecture.smartDumb.benefit3',
        'angular.architecture.smartDumb.benefit4'
      ],
      useCases: [
        'angular.architecture.smartDumb.useCase1',
        'angular.architecture.smartDumb.useCase2',
        'angular.architecture.smartDumb.useCase3'
      ],
      implementation: [
        'angular.architecture.smartDumb.implementation1',
        'angular.architecture.smartDumb.implementation2',
        'angular.architecture.smartDumb.implementation3',
        'angular.architecture.smartDumb.implementation4'
      ],
      challenges: [
        'angular.architecture.smartDumb.challenge1',
        'angular.architecture.smartDumb.challenge2'
      ]
    },
    {
      title: 'angular.architecture.facade.title',
      description: 'angular.architecture.facade.description',
      icon: 'layers',
      detailTitle: 'angular.architecture.facade.detailTitle',
      explanation: 'angular.architecture.facade.explanation',
      codeExample: `// Facade Service
@Injectable({ providedIn: 'root' })
export class UserFacadeService {
  private userApiService = inject(UserApiService);
  private userStateService = inject(UserStateService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  // Unified state
  users$ = this.userStateService.users$;
  loading$ = this.userStateService.loading$;
  currentUser$ = this.authService.currentUser$;

  // Unified actions
  loadUsers(): Observable<User[]> {
    this.userStateService.setLoading(true);
    return this.userApiService.getUsers().pipe(
      tap(users => {
        this.userStateService.setUsers(users);
        this.userStateService.setLoading(false);
      }),
      catchError(error => {
        this.notificationService.showError('Failed to load users');
        this.userStateService.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.userApiService.createUser(user).pipe(
      tap(newUser => {
        this.userStateService.addUser(newUser);
        this.notificationService.showSuccess('User created');
      })
    );
  }

  updateUser(id: string, updates: Partial<User>): Observable<User> {
    return this.userApiService.updateUser(id, updates).pipe(
      tap(updated => {
        this.userStateService.updateUser(updated);
        this.notificationService.showSuccess('User updated');
      })
    );
  }
}

// Component usage
@Component({
  selector: 'app-users',
  template: \`
    @if (facade.loading$ | async) {
      <mat-spinner></mat-spinner>
    }
    @for (user of facade.users$ | async; track user.id) {
      <app-user-card [user]="user"></app-user-card>
    }
  \`
})
export class UsersComponent {
  facade = inject(UserFacadeService);

  ngOnInit() {
    this.facade.loadUsers().subscribe();
  }
}`,
      benefits: [
        'angular.architecture.facade.benefit1',
        'angular.architecture.facade.benefit2',
        'angular.architecture.facade.benefit3',
        'angular.architecture.facade.benefit4'
      ],
      useCases: [
        'angular.architecture.facade.useCase1',
        'angular.architecture.facade.useCase2',
        'angular.architecture.facade.useCase3'
      ],
      implementation: [
        'angular.architecture.facade.implementation1',
        'angular.architecture.facade.implementation2',
        'angular.architecture.facade.implementation3',
        'angular.architecture.facade.implementation4'
      ],
      challenges: [
        'angular.architecture.facade.challenge1',
        'angular.architecture.facade.challenge2'
      ]
    },
    {
      title: 'angular.architecture.module.title',
      description: 'angular.architecture.module.description',
      icon: 'category',
      detailTitle: 'angular.architecture.module.detailTitle',
      explanation: 'angular.architecture.module.explanation',
      codeExample: `// Feature Module Structure
// feature/
//   ├── components/
//   ├── services/
//   ├── models/
//   ├── feature.routes.ts
//   └── index.ts

// Feature Module with Standalone Components
export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: FeatureContainerComponent,
    children: [
      { path: 'list', component: FeatureListComponent },
      { path: 'detail/:id', component: FeatureDetailComponent },
      { path: 'create', component: FeatureCreateComponent }
    ]
  }
];

// Barrel Export (index.ts)
export * from './components/feature-container.component';
export * from './services/feature.service';
export * from './models/feature.model';
export { FEATURE_ROUTES } from './feature.routes';

// Core Module (Traditional)
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    AuthService,
    LoggingService,
    StorageService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only');
    }
  }
}

// Shared Module
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CustomPipe,
    CustomDirective
  ],
  exports: [
    CommonModule,
    MaterialModule,
    CustomPipe,
    CustomDirective
  ]
})
export class SharedModule {}`,
      benefits: [
        'angular.architecture.module.benefit1',
        'angular.architecture.module.benefit2',
        'angular.architecture.module.benefit3',
        'angular.architecture.module.benefit4'
      ],
      useCases: [
        'angular.architecture.module.useCase1',
        'angular.architecture.module.useCase2',
        'angular.architecture.module.useCase3'
      ],
      implementation: [
        'angular.architecture.module.implementation1',
        'angular.architecture.module.implementation2',
        'angular.architecture.module.implementation3',
        'angular.architecture.module.implementation4'
      ],
      challenges: [
        'angular.architecture.module.challenge1',
        'angular.architecture.module.challenge2'
      ]
    },
    {
      title: 'angular.architecture.lazy.title',
      description: 'angular.architecture.lazy.description',
      icon: 'schedule',
      detailTitle: 'angular.architecture.lazy.detailTitle',
      explanation: 'angular.architecture.lazy.explanation',
      codeExample: `// App Routes with Lazy Loading
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes')
      .then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'user',
    loadComponent: () => import('./features/user/user-profile.component')
      .then(m => m.UserProfileComponent)
  }
];

// Lazy Feature Routes
// admin/admin.routes.ts
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserManagementComponent },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component')
          .then(m => m.SettingsComponent)
      }
    ]
  }
];

// Preloading Strategy
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Preload routes with data.preload = true
    if (route.data?.['preload']) {
      console.log('Preloading:', route.path);
      return load();
    }
    return of(null);
  }
}

// App Config
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy)
    )
  ]
};`,
      benefits: [
        'angular.architecture.lazy.benefit1',
        'angular.architecture.lazy.benefit2',
        'angular.architecture.lazy.benefit3',
        'angular.architecture.lazy.benefit4'
      ],
      useCases: [
        'angular.architecture.lazy.useCase1',
        'angular.architecture.lazy.useCase2',
        'angular.architecture.lazy.useCase3'
      ],
      implementation: [
        'angular.architecture.lazy.implementation1',
        'angular.architecture.lazy.implementation2',
        'angular.architecture.lazy.implementation3',
        'angular.architecture.lazy.implementation4'
      ],
      challenges: [
        'angular.architecture.lazy.challenge1',
        'angular.architecture.lazy.challenge2'
      ]
    },
    {
      title: 'angular.architecture.repository.title',
      description: 'angular.architecture.repository.description',
      icon: 'storage',
      detailTitle: 'angular.architecture.repository.detailTitle',
      explanation: 'angular.architecture.repository.explanation',
      codeExample: `// Base Repository Interface
export interface Repository<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(entity: Partial<T>): Observable<T>;
  update(id: string, entity: Partial<T>): Observable<T>;
  delete(id: string): Observable<void>;
}

// Generic Repository Implementation
@Injectable()
export abstract class BaseRepository<T> implements Repository<T> {
  protected http = inject(HttpClient);
  protected abstract apiUrl: string;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(\`\${this.apiUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  create(entity: Partial<T>): Observable<T> {
    return this.http.post<T>(this.apiUrl, entity).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, entity: Partial<T>): Observable<T> {
    return this.http.put<T>(\`\${this.apiUrl}/\${id}\`, entity).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Repository error:', error);
    return throwError(() => new Error('Repository operation failed'));
  }
}

// Specific Repository
@Injectable({ providedIn: 'root' })
export class UserRepository extends BaseRepository<User> {
  protected override apiUrl = '/api/users';

  // Custom methods
  searchByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(\`\${this.apiUrl}/search\`, {
      params: { name }
    });
  }

  getUserWithOrders(userId: string): Observable<UserWithOrders> {
    return this.http.get<UserWithOrders>(\`\${this.apiUrl}/\${userId}/orders\`);
  }
}`,
      benefits: [
        'angular.architecture.repository.benefit1',
        'angular.architecture.repository.benefit2',
        'angular.architecture.repository.benefit3',
        'angular.architecture.repository.benefit4'
      ],
      useCases: [
        'angular.architecture.repository.useCase1',
        'angular.architecture.repository.useCase2',
        'angular.architecture.repository.useCase3'
      ],
      implementation: [
        'angular.architecture.repository.implementation1',
        'angular.architecture.repository.implementation2',
        'angular.architecture.repository.implementation3',
        'angular.architecture.repository.implementation4'
      ],
      challenges: [
        'angular.architecture.repository.challenge1',
        'angular.architecture.repository.challenge2'
      ]
    },
    {
      title: 'angular.architecture.observer.title',
      description: 'angular.architecture.observer.description',
      icon: 'visibility',
      detailTitle: 'angular.architecture.observer.detailTitle',
      explanation: 'angular.architecture.observer.explanation',
      codeExample: `// Subject-based State Management
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.notificationSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.notificationSubject.next({ type: 'error', message });
  }
}

// BehaviorSubject for State
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
}

// ReplaySubject for Caching
@Injectable({ providedIn: 'root' })
export class DataCacheService {
  private cache = new Map<string, ReplaySubject<any>>();

  getData<T>(key: string, fetcher: () => Observable<T>): Observable<T> {
    if (!this.cache.has(key)) {
      const subject = new ReplaySubject<T>(1);
      this.cache.set(key, subject);
      fetcher().subscribe(data => subject.next(data));
    }
    return this.cache.get(key)!.asObservable();
  }
}

// Component Subscription
@Component({
  selector: 'app-notifications',
  template: \`
    @for (notification of notifications; track $index) {
      <div [class]="notification.type">
        {{ notification.message }}
      </div>
    }
  \`
})
export class NotificationsComponent implements OnDestroy {
  private notificationService = inject(NotificationService);
  private destroy$ = new Subject<void>();
  notifications: Notification[] = [];

  ngOnInit() {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notification => {
        this.notifications.push(notification);
        setTimeout(() => this.removeNotification(notification), 5000);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
      benefits: [
        'angular.architecture.observer.benefit1',
        'angular.architecture.observer.benefit2',
        'angular.architecture.observer.benefit3',
        'angular.architecture.observer.benefit4'
      ],
      useCases: [
        'angular.architecture.observer.useCase1',
        'angular.architecture.observer.useCase2',
        'angular.architecture.observer.useCase3'
      ],
      implementation: [
        'angular.architecture.observer.implementation1',
        'angular.architecture.observer.implementation2',
        'angular.architecture.observer.implementation3',
        'angular.architecture.observer.implementation4'
      ],
      challenges: [
        'angular.architecture.observer.challenge1',
        'angular.architecture.observer.challenge2'
      ]
    },
    {
      title: 'angular.architecture.singleton.title',
      description: 'angular.architecture.singleton.description',
      icon: 'filter_1',
      detailTitle: 'angular.architecture.singleton.detailTitle',
      explanation: 'angular.architecture.singleton.explanation',
      codeExample: `// Root Singleton Service
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Only initialized once
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>('/api/login', credentials).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}

// Manual Singleton (Legacy)
@Injectable()
export class LegacyConfigService {
  private static instance: LegacyConfigService;

  private constructor() {
    // Private constructor prevents direct instantiation
  }

  static getInstance(): LegacyConfigService {
    if (!LegacyConfigService.instance) {
      LegacyConfigService.instance = new LegacyConfigService();
    }
    return LegacyConfigService.instance;
  }
}

// Module-level Singleton
@NgModule({
  providers: [
    // Only provided once in CoreModule
    ConfigService,
    LoggingService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule already loaded');
    }
  }
}

// Standalone Component Singleton
export const appConfig: ApplicationConfig = {
  providers: [
    // App-wide singleton
    { provide: AppConfigService, useClass: AppConfigService },
    provideRouter(routes),
    provideHttpClient()
  ]
};`,
      benefits: [
        'angular.architecture.singleton.benefit1',
        'angular.architecture.singleton.benefit2',
        'angular.architecture.singleton.benefit3',
        'angular.architecture.singleton.benefit4'
      ],
      useCases: [
        'angular.architecture.singleton.useCase1',
        'angular.architecture.singleton.useCase2',
        'angular.architecture.singleton.useCase3'
      ],
      implementation: [
        'angular.architecture.singleton.implementation1',
        'angular.architecture.singleton.implementation2',
        'angular.architecture.singleton.implementation3',
        'angular.architecture.singleton.implementation4'
      ],
      challenges: [
        'angular.architecture.singleton.challenge1',
        'angular.architecture.singleton.challenge2'
      ]
    },
    {
      title: 'angular.architecture.decorator.title',
      description: 'angular.architecture.decorator.description',
      icon: 'auto_awesome',
      detailTitle: 'angular.architecture.decorator.detailTitle',
      explanation: 'angular.architecture.decorator.explanation',
      codeExample: `// Method Decorator - Logging
export function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyKey} with\`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`Result:\`, result);
    return result;
  };

  return descriptor;
}

// Property Decorator - Memoization
export function Memoize() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new Map();

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };
}

// Class Decorator - Auto Unsubscribe
export function AutoUnsubscribe() {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        if (property && typeof property.unsubscribe === 'function') {
          property.unsubscribe();
        }
      }
      original?.apply(this);
    };
  };
}

// Usage Example
@Component({
  selector: 'app-example',
  template: '...'
})
@AutoUnsubscribe()
export class ExampleComponent {
  private dataService = inject(DataService);
  
  @LogMethod
  @Memoize()
  expensiveCalculation(n: number): number {
    return fibonacci(n);
  }

  subscription = this.dataService.getData()
    .subscribe(data => console.log(data));
  // Automatically unsubscribed by decorator
}

// Parameter Decorator
export function Validate(target: any, propertyKey: string, parameterIndex: number) {
  const existingParams = Reflect.getMetadata('validate_params', target, propertyKey) || [];
  existingParams.push(parameterIndex);
  Reflect.defineMetadata('validate_params', existingParams, target, propertyKey);
}`,
      benefits: [
        'angular.architecture.decorator.benefit1',
        'angular.architecture.decorator.benefit2',
        'angular.architecture.decorator.benefit3',
        'angular.architecture.decorator.benefit4'
      ],
      useCases: [
        'angular.architecture.decorator.useCase1',
        'angular.architecture.decorator.useCase2',
        'angular.architecture.decorator.useCase3'
      ],
      implementation: [
        'angular.architecture.decorator.implementation1',
        'angular.architecture.decorator.implementation2',
        'angular.architecture.decorator.implementation3',
        'angular.architecture.decorator.implementation4'
      ],
      challenges: [
        'angular.architecture.decorator.challenge1',
        'angular.architecture.decorator.challenge2'
      ]
    },
    {
      title: 'angular.architecture.strategy.title',
      description: 'angular.architecture.strategy.description',
      icon: 'psychology',
      detailTitle: 'angular.architecture.strategy.detailTitle',
      explanation: 'angular.architecture.strategy.explanation',
      codeExample: `// Strategy Interface
export interface ValidationStrategy {
  validate(value: any): boolean;
  getErrorMessage(): string;
}

// Concrete Strategies
export class EmailValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
  }
  
  getErrorMessage(): string {
    return 'Invalid email format';
  }
}

export class PhoneValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return /^\\+?[1-9]\\d{1,14}$/.test(value);
  }
  
  getErrorMessage(): string {
    return 'Invalid phone number';
  }
}

// Context
@Injectable({ providedIn: 'root' })
export class ValidationService {
  private strategy!: ValidationStrategy;

  setStrategy(strategy: ValidationStrategy) {
    this.strategy = strategy;
  }

  validate(value: any): { valid: boolean; error?: string } {
    const valid = this.strategy.validate(value);
    return {
      valid,
      error: valid ? undefined : this.strategy.getErrorMessage()
    };
  }
}

// Payment Strategy Example
export interface PaymentStrategy {
  processPayment(amount: number): Observable<PaymentResult>;
}

export class CreditCardPayment implements PaymentStrategy {
  processPayment(amount: number): Observable<PaymentResult> {
    return this.http.post<PaymentResult>('/api/payment/credit-card', { amount });
  }
}

export class PayPalPayment implements PaymentStrategy {
  processPayment(amount: number): Observable<PaymentResult> {
    return this.http.post<PaymentResult>('/api/payment/paypal', { amount });
  }
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  processPayment(strategy: PaymentStrategy, amount: number): Observable<PaymentResult> {
    return strategy.processPayment(amount);
  }
}

// Component Usage
@Component({
  selector: 'app-checkout',
  template: \`
    <button (click)="pay('credit-card')">Credit Card</button>
    <button (click)="pay('paypal')">PayPal</button>
  \`
})
export class CheckoutComponent {
  private paymentService = inject(PaymentService);
  private strategies = {
    'credit-card': inject(CreditCardPayment),
    'paypal': inject(PayPalPayment)
  };

  pay(method: string) {
    const strategy = this.strategies[method];
    this.paymentService.processPayment(strategy, 100)
      .subscribe(result => console.log(result));
  }
}`,
      benefits: [
        'angular.architecture.strategy.benefit1',
        'angular.architecture.strategy.benefit2',
        'angular.architecture.strategy.benefit3',
        'angular.architecture.strategy.benefit4'
      ],
      useCases: [
        'angular.architecture.strategy.useCase1',
        'angular.architecture.strategy.useCase2',
        'angular.architecture.strategy.useCase3'
      ],
      implementation: [
        'angular.architecture.strategy.implementation1',
        'angular.architecture.strategy.implementation2',
        'angular.architecture.strategy.implementation3',
        'angular.architecture.strategy.implementation4'
      ],
      challenges: [
        'angular.architecture.strategy.challenge1',
        'angular.architecture.strategy.challenge2'
      ]
    },
    {
      title: 'angular.architecture.adapter.title',
      description: 'angular.architecture.adapter.description',
      icon: 'settings_ethernet',
      detailTitle: 'angular.architecture.adapter.detailTitle',
      explanation: 'angular.architecture.adapter.explanation',
      codeExample: `// External API Response
interface ExternalUserResponse {
  user_id: string;
  full_name: string;
  email_address: string;
  created_at: string;
  is_active: boolean;
}

// Internal Domain Model
export interface User {
  id: string;
  name: string;
  email: string;
  createdDate: Date;
  active: boolean;
}

// Adapter
@Injectable({ providedIn: 'root' })
export class UserApiAdapter {
  adaptUser(external: ExternalUserResponse): User {
    return {
      id: external.user_id,
      name: external.full_name,
      email: external.email_address,
      createdDate: new Date(external.created_at),
      active: external.is_active
    };
  }

  adaptUsers(externals: ExternalUserResponse[]): User[] {
    return externals.map(ext => this.adaptUser(ext));
  }

  toExternal(user: Partial<User>): Partial<ExternalUserResponse> {
    return {
      full_name: user.name,
      email_address: user.email,
      is_active: user.active
    };
  }
}

// Service using Adapter
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private adapter = inject(UserApiAdapter);

  getUsers(): Observable<User[]> {
    return this.http.get<ExternalUserResponse[]>('/api/users')
      .pipe(
        map(response => this.adapter.adaptUsers(response))
      );
  }

  createUser(user: Partial<User>): Observable<User> {
    const external = this.adapter.toExternal(user);
    return this.http.post<ExternalUserResponse>('/api/users', external)
      .pipe(
        map(response => this.adapter.adaptUser(response))
      );
  }
}

// Legacy System Adapter
export class LegacySystemAdapter {
  adapt(legacyData: any): ModernData {
    // Transform legacy structure to modern
    return {
      id: legacyData.ID,
      values: this.parseCSV(legacyData.VALUES),
      timestamp: this.parseDate(legacyData.DATE)
    };
  }
}`,
      benefits: [
        'angular.architecture.adapter.benefit1',
        'angular.architecture.adapter.benefit2',
        'angular.architecture.adapter.benefit3',
        'angular.architecture.adapter.benefit4'
      ],
      useCases: [
        'angular.architecture.adapter.useCase1',
        'angular.architecture.adapter.useCase2',
        'angular.architecture.adapter.useCase3'
      ],
      implementation: [
        'angular.architecture.adapter.implementation1',
        'angular.architecture.adapter.implementation2',
        'angular.architecture.adapter.implementation3',
        'angular.architecture.adapter.implementation4'
      ],
      challenges: [
        'angular.architecture.adapter.challenge1',
        'angular.architecture.adapter.challenge2'
      ]
    },
    {
      title: 'angular.architecture.featureSlice.title',
      description: 'angular.architecture.featureSlice.description',
      icon: 'view_module',
      detailTitle: 'angular.architecture.featureSlice.detailTitle',
      explanation: 'angular.architecture.featureSlice.explanation',
      codeExample: `// Feature Slice Structure
// features/
//   product/
//     ├── data/
//     │   ├── product.repository.ts
//     │   ├── product.model.ts
//     │   └── product.api.ts
//     ├── domain/
//     │   ├── product.facade.ts
//     │   ├── product.state.ts
//     │   └── product.service.ts
//     ├── ui/
//     │   ├── product-list/
//     │   ├── product-detail/
//     │   └── product-form/
//     ├── product.routes.ts
//     └── index.ts

// Data Layer
@Injectable({ providedIn: 'root' })
export class ProductRepository {
  private http = inject(HttpClient);
  
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }
}

// Domain Layer
@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private repository = inject(ProductRepository);
  private state = inject(ProductStateService);

  products$ = this.state.products$;
  loading$ = this.state.loading$;

  loadProducts(): void {
    this.state.setLoading(true);
    this.repository.getAll().subscribe({
      next: products => {
        this.state.setProducts(products);
        this.state.setLoading(false);
      },
      error: () => this.state.setLoading(false)
    });
  }
}

// UI Layer
@Component({
  selector: 'app-product-list',
  template: \`
    @if (facade.loading$ | async) {
      <mat-spinner></mat-spinner>
    }
    @for (product of facade.products$ | async; track product.id) {
      <app-product-card [product]="product"></app-product-card>
    }
  \`
})
export class ProductListComponent {
  facade = inject(ProductFacade);

  ngOnInit() {
    this.facade.loadProducts();
  }
}

// Feature Routes
export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent }
    ]
  }
];`,
      benefits: [
        'angular.architecture.featureSlice.benefit1',
        'angular.architecture.featureSlice.benefit2',
        'angular.architecture.featureSlice.benefit3',
        'angular.architecture.featureSlice.benefit4'
      ],
      useCases: [
        'angular.architecture.featureSlice.useCase1',
        'angular.architecture.featureSlice.useCase2',
        'angular.architecture.featureSlice.useCase3'
      ],
      implementation: [
        'angular.architecture.featureSlice.implementation1',
        'angular.architecture.featureSlice.implementation2',
        'angular.architecture.featureSlice.implementation3',
        'angular.architecture.featureSlice.implementation4'
      ],
      challenges: [
        'angular.architecture.featureSlice.challenge1',
        'angular.architecture.featureSlice.challenge2'
      ]
    },
    {
      title: 'angular.architecture.cleanArchitecture.title',
      description: 'angular.architecture.cleanArchitecture.description',
      icon: 'architecture',
      detailTitle: 'angular.architecture.cleanArchitecture.detailTitle',
      explanation: 'angular.architecture.cleanArchitecture.explanation',
      codeExample: `// Clean Architecture Layers
// src/
//   ├── domain/           (Entities & Use Cases)
//   ├── application/      (Application Logic)
//   ├── infrastructure/   (External Services)
//   └── presentation/     (UI Components)

// Domain Layer - Entities
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserRepository {
  findById(id: string): Observable<User>;
  save(user: User): Observable<User>;
}

// Domain Layer - Use Cases
@Injectable({ providedIn: 'root' })
export class GetUserUseCase {
  constructor(@Inject('UserRepository') private repo: UserRepository) {}

  execute(id: string): Observable<User> {
    return this.repo.findById(id);
  }
}

// Infrastructure Layer - Repository Implementation
@Injectable({ providedIn: 'root' })
export class UserHttpRepository implements UserRepository {
  private http = inject(HttpClient);

  findById(id: string): Observable<User> {
    return this.http.get<User>(\`/api/users/\${id}\`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
}

// Application Layer - Facade
@Injectable({ providedIn: 'root' })
export class UserApplicationService {
  private getUserUseCase = inject(GetUserUseCase);
  
  loadUser(id: string): Observable<User> {
    return this.getUserUseCase.execute(id).pipe(
      catchError(error => {
        // Application-level error handling
        return throwError(() => new Error('Failed to load user'));
      })
    );
  }
}

// Presentation Layer - Component
@Component({
  selector: 'app-user-profile',
  template: \`
    @if (user()) {
      <h1>{{ user()!.name }}</h1>
      <p>{{ user()!.email }}</p>
    }
  \`
})
export class UserProfileComponent {
  private userApp = inject(UserApplicationService);
  user = signal<User | null>(null);

  ngOnInit() {
    this.userApp.loadUser('123')
      .subscribe(user => this.user.set(user));
  }
}

// Dependency Injection Setup
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: 'UserRepository', useClass: UserHttpRepository },
    GetUserUseCase,
    UserApplicationService
  ]
};`,
      benefits: [
        'angular.architecture.cleanArchitecture.benefit1',
        'angular.architecture.cleanArchitecture.benefit2',
        'angular.architecture.cleanArchitecture.benefit3',
        'angular.architecture.cleanArchitecture.benefit4'
      ],
      useCases: [
        'angular.architecture.cleanArchitecture.useCase1',
        'angular.architecture.cleanArchitecture.useCase2',
        'angular.architecture.cleanArchitecture.useCase3'
      ],
      implementation: [
        'angular.architecture.cleanArchitecture.implementation1',
        'angular.architecture.cleanArchitecture.implementation2',
        'angular.architecture.cleanArchitecture.implementation3',
        'angular.architecture.cleanArchitecture.implementation4'
      ],
      challenges: [
        'angular.architecture.cleanArchitecture.challenge1',
        'angular.architecture.cleanArchitecture.challenge2'
      ]
    },
    {
      title: 'angular.architecture.cqrs.title',
      description: 'angular.architecture.cqrs.description',
      icon: 'call_split',
      detailTitle: 'angular.architecture.cqrs.detailTitle',
      explanation: 'angular.architecture.cqrs.explanation',
      codeExample: `// Command Side - Write Operations
export interface Command {
  execute(): Observable<void>;
}

export class CreateUserCommand implements Command {
  constructor(
    private user: CreateUserDto,
    private userService: UserService
  ) {}

  execute(): Observable<void> {
    return this.userService.create(this.user).pipe(
      map(() => void 0)
    );
  }
}

export class UpdateUserCommand implements Command {
  constructor(
    private id: string,
    private updates: Partial<User>,
    private userService: UserService
  ) {}

  execute(): Observable<void> {
    return this.userService.update(this.id, this.updates).pipe(
      map(() => void 0)
    );
  }
}

// Command Bus
@Injectable({ providedIn: 'root' })
export class CommandBus {
  execute(command: Command): Observable<void> {
    return command.execute();
  }
}

// Query Side - Read Operations
export interface Query<T> {
  execute(): Observable<T>;
}

export class GetUserQuery implements Query<User> {
  constructor(
    private id: string,
    private userService: UserService
  ) {}

  execute(): Observable<User> {
    return this.userService.getById(this.id);
  }
}

export class GetAllUsersQuery implements Query<User[]> {
  constructor(private userService: UserService) {}

  execute(): Observable<User[]> {
    return this.userService.getAll();
  }
}

// Query Bus
@Injectable({ providedIn: 'root' })
export class QueryBus {
  execute<T>(query: Query<T>): Observable<T> {
    return query.execute();
  }
}

// Component Usage
@Component({
  selector: 'app-user-management',
  template: \`
    @for (user of users(); track user.id) {
      <app-user-card [user]="user"></app-user-card>
    }
    <button (click)="createUser()">Add User</button>
  \`
})
export class UserManagementComponent {
  private commandBus = inject(CommandBus);
  private queryBus = inject(QueryBus);
  private userService = inject(UserService);
  
  users = signal<User[]>([]);

  ngOnInit() {
    const query = new GetAllUsersQuery(this.userService);
    this.queryBus.execute(query)
      .subscribe(users => this.users.set(users));
  }

  createUser() {
    const command = new CreateUserCommand(
      { name: 'New User', email: 'new@example.com' },
      this.userService
    );
    this.commandBus.execute(command).subscribe(() => {
      // Refresh query after command
      this.loadUsers();
    });
  }
}`,
      benefits: [
        'angular.architecture.cqrs.benefit1',
        'angular.architecture.cqrs.benefit2',
        'angular.architecture.cqrs.benefit3',
        'angular.architecture.cqrs.benefit4'
      ],
      useCases: [
        'angular.architecture.cqrs.useCase1',
        'angular.architecture.cqrs.useCase2',
        'angular.architecture.cqrs.useCase3'
      ],
      implementation: [
        'angular.architecture.cqrs.implementation1',
        'angular.architecture.cqrs.implementation2',
        'angular.architecture.cqrs.implementation3',
        'angular.architecture.cqrs.implementation4'
      ],
      challenges: [
        'angular.architecture.cqrs.challenge1',
        'angular.architecture.cqrs.challenge2'
      ]
    },
    {
      title: 'angular.architecture.eventDriven.title',
      description: 'angular.architecture.eventDriven.description',
      icon: 'event',
      detailTitle: 'angular.architecture.eventDriven.detailTitle',
      explanation: 'angular.architecture.eventDriven.explanation',
      codeExample: `// Event Bus
@Injectable({ providedIn: 'root' })
export class EventBus {
  private eventSubject = new Subject<DomainEvent>();
  events$ = this.eventSubject.asObservable();

  publish(event: DomainEvent): void {
    this.eventSubject.next(event);
  }

  ofType<T extends DomainEvent>(eventType: new (...args: any[]) => T): Observable<T> {
    return this.events$.pipe(
      filter(event => event instanceof eventType)
    ) as Observable<T>;
  }
}

// Domain Events
export abstract class DomainEvent {
  readonly timestamp = new Date();
  abstract readonly type: string;
}

export class UserCreatedEvent extends DomainEvent {
  readonly type = 'USER_CREATED';
  constructor(public user: User) { super(); }
}

export class UserUpdatedEvent extends DomainEvent {
  readonly type = 'USER_UPDATED';
  constructor(public userId: string, public changes: Partial<User>) { super(); }
}

export class OrderPlacedEvent extends DomainEvent {
  readonly type = 'ORDER_PLACED';
  constructor(public order: Order) { super(); }
}

// Event Handlers
@Injectable({ providedIn: 'root' })
export class NotificationHandler {
  private eventBus = inject(EventBus);
  private notificationService = inject(NotificationService);

  constructor() {
    this.eventBus.ofType(UserCreatedEvent).subscribe(event => {
      this.notificationService.show(\`Welcome \${event.user.name}!\`);
    });

    this.eventBus.ofType(OrderPlacedEvent).subscribe(event => {
      this.notificationService.show(\`Order #\${event.order.id} placed\`);
    });
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsHandler {
  private eventBus = inject(EventBus);
  private analytics = inject(AnalyticsService);

  constructor() {
    this.eventBus.events$.subscribe(event => {
      this.analytics.track(event.type, {
        timestamp: event.timestamp,
        data: event
      });
    });
  }
}

// Component Publishing Events
@Component({
  selector: 'app-user-form',
  template: \`<form (submit)="save()">...</form>\`
})
export class UserFormComponent {
  private eventBus = inject(EventBus);
  private userService = inject(UserService);

  save() {
    this.userService.create(this.form.value).subscribe(user => {
      // Publish event instead of direct calls
      this.eventBus.publish(new UserCreatedEvent(user));
    });
  }
}`,
      benefits: [
        'angular.architecture.eventDriven.benefit1',
        'angular.architecture.eventDriven.benefit2',
        'angular.architecture.eventDriven.benefit3',
        'angular.architecture.eventDriven.benefit4'
      ],
      useCases: [
        'angular.architecture.eventDriven.useCase1',
        'angular.architecture.eventDriven.useCase2',
        'angular.architecture.eventDriven.useCase3'
      ],
      implementation: [
        'angular.architecture.eventDriven.implementation1',
        'angular.architecture.eventDriven.implementation2',
        'angular.architecture.eventDriven.implementation3',
        'angular.architecture.eventDriven.implementation4'
      ],
      challenges: [
        'angular.architecture.eventDriven.challenge1',
        'angular.architecture.eventDriven.challenge2'
      ]
    },
    {
      title: 'angular.architecture.microFrontends.title',
      description: 'angular.architecture.microFrontends.description',
      icon: 'dashboard',
      detailTitle: 'angular.architecture.microFrontends.detailTitle',
      explanation: 'angular.architecture.microFrontends.explanation',
      codeExample: `// Module Federation Configuration
// webpack.config.js (Shell App)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        products: 'products@http://localhost:4201/remoteEntry.js',
        orders: 'orders@http://localhost:4202/remoteEntry.js'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true }
      }
    })
  ]
};

// Shell App Routes
export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('products/Module')
      .then(m => m.ProductsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('orders/Module')
      .then(m => m.OrdersModule)
  }
];

// Remote App (Products) - webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/app/products/products.module.ts'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true }
      }
    })
  ]
};

// Shared Event Bus for Communication
@Injectable({ providedIn: 'root' })
export class MicroFrontendEventBus {
  private events = new Subject<MicroFrontendEvent>();
  events$ = this.events.asObservable();

  publish(event: MicroFrontendEvent): void {
    this.events.next(event);
  }

  subscribe(callback: (event: MicroFrontendEvent) => void) {
    return this.events$.subscribe(callback);
  }
}

// Dynamic Remote Loading
@Injectable({ providedIn: 'root' })
export class RemoteLoaderService {
  async loadRemote(remoteName: string, moduleName: string): Promise<any> {
    const container = window[remoteName];
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(moduleName);
    return factory();
  }
}`,
      benefits: [
        'angular.architecture.microFrontends.benefit1',
        'angular.architecture.microFrontends.benefit2',
        'angular.architecture.microFrontends.benefit3',
        'angular.architecture.microFrontends.benefit4'
      ],
      useCases: [
        'angular.architecture.microFrontends.useCase1',
        'angular.architecture.microFrontends.useCase2',
        'angular.architecture.microFrontends.useCase3'
      ],
      implementation: [
        'angular.architecture.microFrontends.implementation1',
        'angular.architecture.microFrontends.implementation2',
        'angular.architecture.microFrontends.implementation3',
        'angular.architecture.microFrontends.implementation4'
      ],
      challenges: [
        'angular.architecture.microFrontends.challenge1',
        'angular.architecture.microFrontends.challenge2'
      ]
    },
    {
      title: 'angular.architecture.ddd.title',
      description: 'angular.architecture.ddd.description',
      icon: 'domain',
      detailTitle: 'angular.architecture.ddd.detailTitle',
      explanation: 'angular.architecture.ddd.explanation',
      codeExample: `// Domain Model - Entity
export class User {
  private constructor(
    public readonly id: UserId,
    public name: UserName,
    public email: Email,
    private status: UserStatus
  ) {}

  static create(name: string, email: string): User {
    return new User(
      UserId.generate(),
      UserName.create(name),
      Email.create(email),
      UserStatus.Active
    );
  }

  activate(): void {
    if (this.status === UserStatus.Active) {
      throw new Error('User already active');
    }
    this.status = UserStatus.Active;
  }

  deactivate(): void {
    this.status = UserStatus.Inactive;
  }

  isActive(): boolean {
    return this.status === UserStatus.Active;
  }
}

// Value Objects
export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new Error('Invalid email');
    }
    return new Email(email);
  }

  private static isValid(email: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }

  getValue(): string {
    return this.value;
  }
}

// Aggregate Root
export class Order {
  private items: OrderItem[] = [];
  
  constructor(
    public readonly id: OrderId,
    private customerId: CustomerId,
    private status: OrderStatus
  ) {}

  addItem(product: Product, quantity: number): void {
    const item = OrderItem.create(product, quantity);
    this.items.push(item);
  }

  removeItem(productId: ProductId): void {
    this.items = this.items.filter(i => !i.productId.equals(productId));
  }

  getTotalAmount(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.getSubtotal()),
      Money.zero()
    );
  }

  place(): void {
    if (this.items.length === 0) {
      throw new Error('Cannot place empty order');
    }
    this.status = OrderStatus.Placed;
    // Domain event
    DomainEvents.raise(new OrderPlacedEvent(this));
  }
}

// Repository Interface
export interface UserRepository {
  findById(id: UserId): Observable<User | null>;
  save(user: User): Observable<void>;
  findByEmail(email: Email): Observable<User | null>;
}

// Domain Service
@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
  constructor(
    @Inject('UserRepository') private userRepo: UserRepository,
    private emailService: EmailService
  ) {}

  async register(name: string, email: string): Promise<User> {
    const emailVO = Email.create(email);
    const existing = await firstValueFrom(this.userRepo.findByEmail(emailVO));
    
    if (existing) {
      throw new Error('Email already registered');
    }

    const user = User.create(name, email);
    await firstValueFrom(this.userRepo.save(user));
    await this.emailService.sendWelcome(user);
    
    return user;
  }
}`,
      benefits: [
        'angular.architecture.ddd.benefit1',
        'angular.architecture.ddd.benefit2',
        'angular.architecture.ddd.benefit3',
        'angular.architecture.ddd.benefit4'
      ],
      useCases: [
        'angular.architecture.ddd.useCase1',
        'angular.architecture.ddd.useCase2',
        'angular.architecture.ddd.useCase3'
      ],
      implementation: [
        'angular.architecture.ddd.implementation1',
        'angular.architecture.ddd.implementation2',
        'angular.architecture.ddd.implementation3',
        'angular.architecture.ddd.implementation4'
      ],
      challenges: [
        'angular.architecture.ddd.challenge1',
        'angular.architecture.ddd.challenge2'
      ]
    },
    {
      title: 'angular.architecture.hexagonal.title',
      description: 'angular.architecture.hexagonal.description',
      icon: 'hexagon',
      detailTitle: 'angular.architecture.hexagonal.detailTitle',
      explanation: 'angular.architecture.hexagonal.explanation',
      codeExample: `// Port (Interface in Domain)
export interface UserRepository {
  save(user: User): Observable<void>;
  findById(id: string): Observable<User>;
}

export interface NotificationService {
  send(message: string): Observable<void>;
}

// Domain Layer (Core Business Logic)
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}

  validate(): boolean {
    return this.email.includes('@') && this.name.length > 0;
  }
}

// Use Case (Application Layer)
@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepo: UserRepository,
    @Inject('NotificationService') private notifier: NotificationService
  ) {}

  execute(name: string, email: string): Observable<User> {
    const user = new User(crypto.randomUUID(), name, email);
    
    if (!user.validate()) {
      return throwError(() => new Error('Invalid user data'));
    }

    return this.userRepo.save(user).pipe(
      switchMap(() => this.notifier.send(\`Welcome \${user.name}!\`)),
      map(() => user)
    );
  }
}

// Adapter (Infrastructure Layer) - HTTP Implementation
@Injectable({ providedIn: 'root' })
export class HttpUserRepository implements UserRepository {
  private http = inject(HttpClient);

  save(user: User): Observable<void> {
    return this.http.post<void>('/api/users', user);
  }

  findById(id: string): Observable<User> {
    return this.http.get<any>(\`/api/users/\${id}\`).pipe(
      map(data => new User(data.id, data.name, data.email))
    );
  }
}

// Adapter - Email Notification
@Injectable({ providedIn: 'root' })
export class EmailNotificationService implements NotificationService {
  private http = inject(HttpClient);

  send(message: string): Observable<void> {
    return this.http.post<void>('/api/notifications', { message });
  }
}

// DI Configuration
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: 'UserRepository', useClass: HttpUserRepository },
    { provide: 'NotificationService', useClass: EmailNotificationService },
    RegisterUserUseCase
  ]
};`,
      benefits: [
        'angular.architecture.hexagonal.benefit1',
        'angular.architecture.hexagonal.benefit2',
        'angular.architecture.hexagonal.benefit3',
        'angular.architecture.hexagonal.benefit4'
      ],
      useCases: [
        'angular.architecture.hexagonal.useCase1',
        'angular.architecture.hexagonal.useCase2',
        'angular.architecture.hexagonal.useCase3'
      ],
      implementation: [
        'angular.architecture.hexagonal.implementation1',
        'angular.architecture.hexagonal.implementation2',
        'angular.architecture.hexagonal.implementation3',
        'angular.architecture.hexagonal.implementation4'
      ],
      challenges: [
        'angular.architecture.hexagonal.challenge1',
        'angular.architecture.hexagonal.challenge2'
      ]
    },
    {
      title: 'angular.architecture.stateManagement.title',
      description: 'angular.architecture.stateManagement.description',
      icon: 'hub',
      detailTitle: 'angular.architecture.stateManagement.detailTitle',
      explanation: 'angular.architecture.stateManagement.explanation',
      codeExample: `// Signal Store Pattern
interface AppState {
  users: User[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class UserStore {
  private state = signal<AppState>({
    users: [],
    loading: false,
    error: null
  });

  // Selectors
  readonly users = computed(() => this.state().users);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly userCount = computed(() => this.state().users.length);

  // Actions
  loadUsers(): void {
    this.state.update(state => ({ ...state, loading: true, error: null }));
    
    this.userService.getUsers().subscribe({
      next: users => this.state.update(state => ({
        ...state,
        users,
        loading: false
      })),
      error: err => this.state.update(state => ({
        ...state,
        loading: false,
        error: err.message
      }))
    });
  }

  addUser(user: User): void {
    this.state.update(state => ({
      ...state,
      users: [...state.users, user]
    }));
  }

  removeUser(id: string): void {
    this.state.update(state => ({
      ...state,
      users: state.users.filter(u => u.id !== id)
    }));
  }

  updateUser(updated: User): void {
    this.state.update(state => ({
      ...state,
      users: state.users.map(u => u.id === updated.id ? updated : u)
    }));
  }
}

// Component Usage
@Component({
  selector: 'app-users',
  template: \`
    @if (store.loading()) {
      <mat-spinner></mat-spinner>
    }
    @if (store.error()) {
      <div class="error">{{ store.error() }}</div>
    }
    <p>Total: {{ store.userCount() }}</p>
    @for (user of store.users(); track user.id) {
      <app-user-card [user]="user"></app-user-card>
    }
  \`
})
export class UsersComponent {
  store = inject(UserStore);

  ngOnInit() {
    this.store.loadUsers();
  }
}`,
      benefits: [
        'angular.architecture.stateManagement.benefit1',
        'angular.architecture.stateManagement.benefit2',
        'angular.architecture.stateManagement.benefit3',
        'angular.architecture.stateManagement.benefit4'
      ],
      useCases: [
        'angular.architecture.stateManagement.useCase1',
        'angular.architecture.stateManagement.useCase2',
        'angular.architecture.stateManagement.useCase3'
      ],
      implementation: [
        'angular.architecture.stateManagement.implementation1',
        'angular.architecture.stateManagement.implementation2',
        'angular.architecture.stateManagement.implementation3',
        'angular.architecture.stateManagement.implementation4'
      ],
      challenges: [
        'angular.architecture.stateManagement.challenge1',
        'angular.architecture.stateManagement.challenge2'
      ]
    },
    {
      title: 'angular.architecture.onion.title',
      description: 'angular.architecture.onion.description',
      icon: 'contrast',
      detailTitle: 'angular.architecture.onion.detailTitle',
      explanation: 'angular.architecture.onion.explanation',
      codeExample: `// Onion Architecture Layers (innermost to outermost)

// 1. Domain Core (Innermost - No Dependencies)
export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number
  ) {}

  applyDiscount(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Invalid discount');
    }
    this.price = this.price * (1 - percentage / 100);
  }

  isAffordable(budget: number): boolean {
    return this.price <= budget;
  }
}

// Domain Service
export interface IProductRepository {
  findById(id: string): Observable<Product>;
  save(product: Product): Observable<void>;
}

// 2. Domain Services Layer
@Injectable()
export class PricingService {
  calculateTax(price: number, rate: number): number {
    return price * rate;
  }

  calculateTotal(products: Product[]): number {
    return products.reduce((sum, p) => sum + p.price, 0);
  }
}

// 3. Application Services Layer
@Injectable({ providedIn: 'root' })
export class ProductApplicationService {
  constructor(
    @Inject('IProductRepository') private repo: IProductRepository,
    private pricingService: PricingService
  ) {}

  applyDiscountToProduct(id: string, discount: number): Observable<Product> {
    return this.repo.findById(id).pipe(
      map(product => {
        product.applyDiscount(discount);
        return product;
      }),
      switchMap(product => this.repo.save(product).pipe(map(() => product)))
    );
  }
}

// 4. Infrastructure Layer (Outermost)
@Injectable({ providedIn: 'root' })
export class HttpProductRepository implements IProductRepository {
  private http = inject(HttpClient);

  findById(id: string): Observable<Product> {
    return this.http.get<any>(\`/api/products/\${id}\`).pipe(
      map(data => new Product(data.id, data.name, data.price))
    );
  }

  save(product: Product): Observable<void> {
    return this.http.put<void>(\`/api/products/\${product.id}\`, product);
  }
}

// 5. Presentation Layer
@Component({
  selector: 'app-product-detail',
  template: \`
    <h1>{{ product()?.name }}</h1>
    <p>Price: {{ product()?.price }}</p>
    <button (click)="applyDiscount()">Apply 10% Discount</button>
  \`
})
export class ProductDetailComponent {
  private appService = inject(ProductApplicationService);
  product = signal<Product | null>(null);

  applyDiscount() {
    this.appService.applyDiscountToProduct('123', 10)
      .subscribe(p => this.product.set(p));
  }
}`,
      benefits: [
        'angular.architecture.onion.benefit1',
        'angular.architecture.onion.benefit2',
        'angular.architecture.onion.benefit3',
        'angular.architecture.onion.benefit4'
      ],
      useCases: [
        'angular.architecture.onion.useCase1',
        'angular.architecture.onion.useCase2',
        'angular.architecture.onion.useCase3'
      ],
      implementation: [
        'angular.architecture.onion.implementation1',
        'angular.architecture.onion.implementation2',
        'angular.architecture.onion.implementation3',
        'angular.architecture.onion.implementation4'
      ],
      challenges: [
        'angular.architecture.onion.challenge1',
        'angular.architecture.onion.challenge2'
      ]
    },
    {
      title: 'angular.architecture.mvvm.title',
      description: 'angular.architecture.mvvm.description',
      icon: 'view_in_ar',
      detailTitle: 'angular.architecture.mvvm.detailTitle',
      explanation: 'angular.architecture.mvvm.explanation',
      codeExample: `// Model (Domain/Business Logic)
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

export class UserModel {
  static validate(user: Partial<User>): boolean {
    return !!(user.email?.includes('@') && user.firstName && user.lastName);
  }

  static getFullName(user: User): string {
    return \`\${user.firstName} \${user.lastName}\`;
  }
}

// ViewModel (Component as ViewModel)
@Component({
  selector: 'app-user-form',
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput formControlName="firstName" placeholder="First Name">
        @if (form.controls.firstName.errors?.['required']) {
          <mat-error>First name is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <input matInput formControlName="lastName" placeholder="Last Name">
        @if (form.controls.lastName.errors?.['required']) {
          <mat-error>Last name is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <input matInput formControlName="email" placeholder="Email">
        @if (form.controls.email.errors?.['email']) {
          <mat-error>Invalid email</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <input matInput type="number" formControlName="age" placeholder="Age">
      </mat-form-field>

      <p>Full Name Preview: {{ fullNamePreview() }}</p>
      <p>Is Valid: {{ isFormValid() }}</p>

      <button mat-raised-button type="submit" [disabled]="!isFormValid()">
        Save User
      </button>
    </form>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  private userService = inject(UserService);

  // Form as part of ViewModel
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl<number | null>(null, [Validators.min(0)])
  });

  // Computed properties (ViewModel state)
  fullNamePreview = computed(() => {
    const firstName = this.form.controls.firstName.value || '';
    const lastName = this.form.controls.lastName.value || '';
    return \`\${firstName} \${lastName}\`.trim() || 'N/A';
  });

  isFormValid = computed(() => this.form.valid);

  // Commands (ViewModel actions)
  onSubmit(): void {
    if (this.form.valid) {
      const user: Partial<User> = {
        id: crypto.randomUUID(),
        ...this.form.value as any
      };

      this.userService.createUser(user as User).subscribe({
        next: () => this.form.reset(),
        error: err => console.error(err)
      });
    }
  }
}

// View binds to ViewModel (Component)
// Data flows: Model ← ViewModel ← View
// Commands: View → ViewModel → Model`,
      benefits: [
        'angular.architecture.mvvm.benefit1',
        'angular.architecture.mvvm.benefit2',
        'angular.architecture.mvvm.benefit3',
        'angular.architecture.mvvm.benefit4'
      ],
      useCases: [
        'angular.architecture.mvvm.useCase1',
        'angular.architecture.mvvm.useCase2',
        'angular.architecture.mvvm.useCase3'
      ],
      implementation: [
        'angular.architecture.mvvm.implementation1',
        'angular.architecture.mvvm.implementation2',
        'angular.architecture.mvvm.implementation3',
        'angular.architecture.mvvm.implementation4'
      ],
      challenges: [
        'angular.architecture.mvvm.challenge1',
        'angular.architecture.mvvm.challenge2'
      ]
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

  readonly realWorldPatterns = signal<RealWorldPattern[]>([
    {
      title: 'angular.realWorldPatterns.errorBoundary.title',
      description: 'angular.realWorldPatterns.errorBoundary.description',
      icon: 'error_outline',
      useCases: [
        'angular.realWorldPatterns.errorBoundary.useCase1',
        'angular.realWorldPatterns.errorBoundary.useCase2',
        'angular.realWorldPatterns.errorBoundary.useCase3',
        'angular.realWorldPatterns.errorBoundary.useCase4'
      ],
      code: `// Error Boundary Service
@Injectable({ providedIn: 'root' })
export class ErrorBoundaryService {
  private errorSubject = new Subject<Error>();
  errors$ = this.errorSubject.asObservable();
  
  handleError(error: Error, context?: string) {
    console.error(\`Error in \${context}:\`, error);
    this.errorSubject.next(error);
  }
}

// Error Boundary Component
@Component({
  selector: 'app-error-boundary',
  template: \`
    @if (hasError()) {
      <div class="error-container">
        <mat-icon>error</mat-icon>
        <h2>{{ 'errors.somethingWentWrong' | translate }}</h2>
        <p>{{ errorMessage() }}</p>
        <button mat-raised-button (click)="retry()">
          {{ 'errors.retry' | translate }}
        </button>
      </div>
    } @else {
      <ng-content />
    }
  \`
})
export class ErrorBoundaryComponent implements OnInit {
  hasError = signal(false);
  errorMessage = signal('');
  private errorBoundary = inject(ErrorBoundaryService);
  
  ngOnInit() {
    this.errorBoundary.errors$.subscribe(error => {
      this.hasError.set(true);
      this.errorMessage.set(error.message);
    });
  }
  
  retry() {
    this.hasError.set(false);
    this.errorMessage.set('');
    window.location.reload();
  }
}`
    },
    {
      title: 'angular.realWorldPatterns.loadingState.title',
      description: 'angular.realWorldPatterns.loadingState.description',
      icon: 'hourglass_empty',
      useCases: [
        'angular.realWorldPatterns.loadingState.useCase1',
        'angular.realWorldPatterns.loadingState.useCase2',
        'angular.realWorldPatterns.loadingState.useCase3',
        'angular.realWorldPatterns.loadingState.useCase4'
      ],
      code: `// Loading State Service mit Signals
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingMap = new Map<string, boolean>();
  private loadingSignal = signal<Map<string, boolean>>(new Map());
  
  isLoading = computed(() => {
    const map = this.loadingSignal();
    return Array.from(map.values()).some(loading => loading);
  });
  
  startLoading(key: string) {
    this.loadingMap.set(key, true);
    this.loadingSignal.set(new Map(this.loadingMap));
  }
  
  stopLoading(key: string) {
    this.loadingMap.delete(key);
    this.loadingSignal.set(new Map(this.loadingMap));
  }
  
  isLoadingKey(key: string): boolean {
    return this.loadingMap.get(key) ?? false;
  }
}

// Component mit Loading States
@Component({
  selector: 'app-data-list',
  template: \`
    @if (isLoading()) {
      <mat-progress-spinner mode="indeterminate" />
    } @else if (error()) {
      <app-error-message [error]="error()" />
    } @else if (data().length === 0) {
      <app-empty-state />
    } @else {
      @for (item of data(); track item.id) {
        <app-item-card [item]="item" />
      }
    }
  \`
})
export class DataListComponent {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);
  
  isLoading = signal(false);
  error = signal<Error | null>(null);
  data = signal<Item[]>([]);
  
  async loadData() {
    const key = 'data-list';
    this.isLoading.set(true);
    this.loadingService.startLoading(key);
    
    try {
      const result = await firstValueFrom(
        this.http.get<Item[]>('/api/items')
      );
      this.data.set(result);
      this.error.set(null);
    } catch (err) {
      this.error.set(err as Error);
    } finally {
      this.isLoading.set(false);
      this.loadingService.stopLoading(key);
    }
  }
}`
    },
    {
      title: 'angular.realWorldPatterns.retryLogic.title',
      description: 'angular.realWorldPatterns.retryLogic.description',
      icon: 'replay',
      useCases: [
        'angular.realWorldPatterns.retryLogic.useCase1',
        'angular.realWorldPatterns.retryLogic.useCase2',
        'angular.realWorldPatterns.retryLogic.useCase3',
        'angular.realWorldPatterns.retryLogic.useCase4'
      ],
      code: `// Retry Service mit exponential backoff
@Injectable({ providedIn: 'root' })
export class RetryService {
  private http = inject(HttpClient);
  
  // Retry mit exponential backoff
  retryWithBackoff<T>(
    observable: Observable<T>,
    maxRetries = 3,
    delay = 1000
  ): Observable<T> {
    return observable.pipe(
      retry({
        count: maxRetries,
        delay: (error, retryCount) => {
          const backoffDelay = delay * Math.pow(2, retryCount - 1);
          console.log(\`Retry \${retryCount} nach \${backoffDelay}ms\`);
          return timer(backoffDelay);
        }
      })
    );
  }
  
  // Retry nur bei bestimmten HTTP Fehlern
  retryOnSpecificErrors<T>(
    observable: Observable<T>,
    retriableErrors = [500, 502, 503, 504]
  ): Observable<T> {
    return observable.pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            if (index >= 3) {
              return throwError(() => error);
            }
            if (error.status && retriableErrors.includes(error.status)) {
              return timer(1000 * (index + 1));
            }
            return throwError(() => error);
          })
        )
      )
    );
  }
}

// Component mit Retry Logic
@Component({
  selector: 'app-api-data',
  template: \`
    <button (click)="loadWithRetry()">Load with Retry</button>
    @if (data()) {
      <pre>{{ data() | json }}</pre>
    }
  \`
})
export class ApiDataComponent {
  private http = inject(HttpClient);
  private retryService = inject(RetryService);
  
  data = signal<any>(null);
  
  loadWithRetry() {
    const request$ = this.http.get('/api/unstable-endpoint');
    
    this.retryService
      .retryWithBackoff(request$, 5, 500)
      .subscribe({
        next: data => this.data.set(data),
        error: err => console.error('Failed after retries:', err)
      });
  }
}`
    },
    {
      title: 'angular.realWorldPatterns.optimisticUpdates.title',
      description: 'angular.realWorldPatterns.optimisticUpdates.description',
      icon: 'flash_on',
      useCases: [
        'angular.realWorldPatterns.optimisticUpdates.useCase1',
        'angular.realWorldPatterns.optimisticUpdates.useCase2',
        'angular.realWorldPatterns.optimisticUpdates.useCase3',
        'angular.realWorldPatterns.optimisticUpdates.useCase4'
      ],
      code: `// Optimistic Update Service
@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private todos = signal<Todo[]>([]);
  
  getTodos = computed(() => this.todos());
  
  // Optimistic Add
  async addTodo(title: string) {
    const optimisticTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      isOptimistic: true
    };
    
    // Sofort zur UI hinzufügen
    this.todos.update(current => [...current, optimisticTodo]);
    
    try {
      // Server Request
      const serverTodo = await firstValueFrom(
        this.http.post<Todo>('/api/todos', { title })
      );
      
      // Optimistisches Todo durch Server-Todo ersetzen
      this.todos.update(current =>
        current.map(t => t.id === optimisticTodo.id ? serverTodo : t)
      );
    } catch (error) {
      // Rollback bei Fehler
      this.todos.update(current =>
        current.filter(t => t.id !== optimisticTodo.id)
      );
      throw error;
    }
  }
  
  // Optimistic Update
  async updateTodo(id: string, updates: Partial<Todo>) {
    const previousTodos = this.todos();
    
    // Sofort UI updaten
    this.todos.update(current =>
      current.map(t => t.id === id ? { ...t, ...updates } : t)
    );
    
    try {
      await firstValueFrom(
        this.http.patch(\`/api/todos/\${id}\`, updates)
      );
    } catch (error) {
      // Rollback bei Fehler
      this.todos.set(previousTodos);
      throw error;
    }
  }
  
  // Optimistic Delete
  async deleteTodo(id: string) {
    const previousTodos = this.todos();
    
    // Sofort aus UI entfernen
    this.todos.update(current => current.filter(t => t.id !== id));
    
    try {
      await firstValueFrom(
        this.http.delete(\`/api/todos/\${id}\`)
      );
    } catch (error) {
      // Rollback bei Fehler
      this.todos.set(previousTodos);
      throw error;
    }
  }
}`
    },
    {
      title: 'angular.realWorldPatterns.polling.title',
      description: 'angular.realWorldPatterns.polling.description',
      icon: 'sync',
      useCases: [
        'angular.realWorldPatterns.polling.useCase1',
        'angular.realWorldPatterns.polling.useCase2',
        'angular.realWorldPatterns.polling.useCase3',
        'angular.realWorldPatterns.polling.useCase4'
      ],
      code: `// Polling Service
@Injectable({ providedIn: 'root' })
export class PollingService {
  private http = inject(HttpClient);
  
  // Einfaches Polling
  poll<T>(
    url: string,
    interval = 5000
  ): Observable<T> {
    return timer(0, interval).pipe(
      switchMap(() => this.http.get<T>(url)),
      shareReplay(1)
    );
  }
  
  // Polling mit Bedingung
  pollUntil<T>(
    url: string,
    condition: (data: T) => boolean,
    interval = 2000,
    maxAttempts = 30
  ): Observable<T> {
    return timer(0, interval).pipe(
      take(maxAttempts),
      switchMap(() => this.http.get<T>(url)),
      takeWhile(data => !condition(data), true),
      last()
    );
  }
  
  // Exponential Backoff Polling
  pollWithBackoff<T>(
    url: string,
    initialDelay = 1000,
    maxDelay = 60000
  ): Observable<T> {
    let delay = initialDelay;
    
    return defer(() => this.http.get<T>(url)).pipe(
      expand(() => {
        delay = Math.min(delay * 2, maxDelay);
        return timer(delay).pipe(
          switchMap(() => this.http.get<T>(url))
        );
      })
    );
  }
}

// Component mit Polling
@Component({
  selector: 'app-job-status',
  template: \`
    <div class="status-card">
      <h3>Job Status: {{ status() }}</h3>
      <mat-progress-bar 
        [value]="progress()" 
        mode="determinate" 
      />
      @if (status() === 'completed') {
        <mat-icon color="primary">check_circle</mat-icon>
      }
    </div>
  \`
})
export class JobStatusComponent implements OnInit, OnDestroy {
  private pollingService = inject(PollingService);
  private destroyRef = inject(DestroyRef);
  
  status = signal<string>('pending');
  progress = signal<number>(0);
  
  ngOnInit() {
    // Poll bis Job fertig ist
    this.pollingService
      .pollUntil<JobStatus>(
        '/api/jobs/123',
        data => data.status === 'completed',
        3000,
        100
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.status.set(data.status);
          this.progress.set(data.progress);
        },
        error: err => console.error('Polling failed:', err)
      });
  }
}`
    },
    {
      title: 'angular.realWorldPatterns.websocket.title',
      description: 'angular.realWorldPatterns.websocket.description',
      icon: 'cable',
      useCases: [
        'angular.realWorldPatterns.websocket.useCase1',
        'angular.realWorldPatterns.websocket.useCase2',
        'angular.realWorldPatterns.websocket.useCase3',
        'angular.realWorldPatterns.websocket.useCase4'
      ],
      code: `// WebSocket Service
@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messages$ = new Subject<any>();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  
  connect(url: string): Observable<any> {
    if (this.socket) {
      return this.messages$.asObservable();
    }
    
    this.socket = new WebSocket(url);
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messages$.next(data);
    };
    
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.reconnect(url);
    };
    
    this.socket.onclose = () => {
      console.log('WebSocket closed');
      this.socket = null;
      this.reconnect(url);
    };
    
    return this.messages$.asObservable();
  }
  
  private reconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      setTimeout(() => {
        console.log(\`Reconnecting... Attempt \${this.reconnectAttempts}\`);
        this.connect(url);
      }, delay);
    }
  }
  
  send(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// Component mit WebSocket
@Component({
  selector: 'app-live-chat',
  template: \`
    <div class="chat-container">
      <div class="messages">
        @for (msg of messages(); track msg.id) {
          <div class="message" [class.own]="msg.userId === currentUserId()">
            <strong>{{ msg.username }}:</strong>
            <span>{{ msg.text }}</span>
            <small>{{ msg.timestamp | date:'short' }}</small>
          </div>
        }
      </div>
      
      <form (submit)="sendMessage()">
        <input [(ngModel)]="messageText" placeholder="Type message..." />
        <button mat-raised-button type="submit">Send</button>
      </form>
    </div>
  \`
})
export class LiveChatComponent implements OnInit, OnDestroy {
  private ws = inject(WebSocketService);
  private destroyRef = inject(DestroyRef);
  
  messages = signal<ChatMessage[]>([]);
  messageText = '';
  currentUserId = signal('user-123');
  
  ngOnInit() {
    this.ws.connect('wss://api.example.com/chat')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(message => {
        this.messages.update(msgs => [...msgs, message]);
      });
  }
  
  sendMessage() {
    if (this.messageText.trim()) {
      this.ws.send({
        type: 'message',
        text: this.messageText,
        userId: this.currentUserId(),
        timestamp: new Date()
      });
      this.messageText = '';
    }
  }
  
  ngOnDestroy() {
    this.ws.disconnect();
  }
}`
    }
  ]);

  readonly developmentTools = signal<DevelopmentTool[]>([
    {
      title: 'angular.developmentTools.schematics.title',
      description: 'angular.developmentTools.schematics.description',
      icon: 'auto_fix_high',
      setup: `// Custom Schematic erstellen
npm install -g @angular-devkit/schematics-cli
schematics blank --name=my-schematics

// In collection.json definieren
{
  "schematics": {
    "my-component": {
      "description": "Creates a new component",
      "factory": "./my-component/index#myComponent"
    }
  }
}`,
      config: `// my-component/index.ts
import { Rule, SchematicContext, Tree, apply, url, template, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export function myComponent(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options
      })
    ]);
    
    return mergeWith(templateSource);
  };
}

// Verwendung
ng generate my-schematics:my-component --name=feature`
    },
    {
      title: 'angular.developmentTools.eslint.title',
      description: 'angular.developmentTools.eslint.description',
      icon: 'rule',
      setup: `// Installation
ng add @angular-eslint/schematics

// ESLint ausführen
ng lint

// Auto-fix
ng lint --fix`,
      config: `// eslint.config.js (ESLint 9+)
import angular from '@angular-eslint/eslint-plugin';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@angular-eslint': angular,
      '@typescript-eslint': typescript
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angular.templates
    },
    rules: {
      '@angular-eslint/template/accessibility-alt-text': 'error',
      '@angular-eslint/template/accessibility-elements-content': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error'
    }
  }
];`
    },
    {
      title: 'angular.developmentTools.prettier.title',
      description: 'angular.developmentTools.prettier.description',
      icon: 'format_paint',
      setup: `// Installation
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

// Format all files
npx prettier --write "src/**/*.{ts,html,scss,json}"

// Check formatting
npx prettier --check "src/**/*.{ts,html,scss,json}"`,
      config: `// .prettierrc.json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    },
    {
      "files": "*.component.html",
      "options": {
        "parser": "angular",
        "printWidth": 120
      }
    }
  ]
}

// .prettierignore
dist
node_modules
coverage
*.min.js
*.bundle.js

// package.json Scripts
{
  "scripts": {
    "format": "prettier --write \\"src/**/*.{ts,html,scss,json}\\"",
    "format:check": "prettier --check \\"src/**/*.{ts,html,scss,json}\\""
  }
}`
    },
    {
      title: 'angular.developmentTools.husky.title',
      description: 'angular.developmentTools.husky.description',
      icon: 'pets',
      setup: `// Installation
npm install --save-dev husky lint-staged

// Husky initialisieren
npx husky init

// Pre-commit hook erstellen
echo "npx lint-staged" > .husky/pre-commit

// Pre-push hook
echo "npm run test:ci" > .husky/pre-push`,
      config: `// package.json
{
  "scripts": {
    "prepare": "husky",
    "test:ci": "ng test --watch=false --browsers=ChromeHeadless"
  },
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.html": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.scss": [
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}

// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Lint staged files
npx lint-staged

# Type check
npm run type-check || {
  echo "❌ Type check failed"
  exit 1
}

echo "✅ Pre-commit checks passed"

// .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validate commit message format
npx --no -- commitlint --edit $1`
    },
    {
      title: 'angular.developmentTools.conventionalCommits.title',
      description: 'angular.developmentTools.conventionalCommits.description',
      icon: 'commit',
      setup: `// Installation
npm install --save-dev @commitlint/cli @commitlint/config-conventional

// Commitizen für interaktive Commits
npm install --save-dev commitizen cz-conventional-changelog

// Commitizen initialisieren
npx commitizen init cz-conventional-changelog --save-dev --save-exact`,
      config: `// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Neue Features
        'fix',      // Bug Fixes
        'docs',     // Dokumentation
        'style',    // Code-Formatierung
        'refactor', // Code-Refactoring
        'perf',     // Performance-Verbesserungen
        'test',     // Tests
        'build',    // Build-System
        'ci',       // CI/CD
        'chore',    // Wartung
        'revert'    // Revert
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always']
  }
};

// package.json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}

// Commit Message Beispiele:
// feat(auth): add JWT authentication
// fix(api): resolve null pointer exception
// docs(readme): update installation instructions
// style(components): format code with prettier
// refactor(services): simplify data fetching logic
// perf(rendering): optimize virtual scrolling
// test(auth): add unit tests for login component
// build(deps): upgrade Angular to v20
// ci(github): add automated deployment workflow

// Mit Scope und Breaking Change:
// feat(api)!: change authentication endpoint

// BREAKING CHANGE: The /auth endpoint has been replaced
// with /api/v2/authenticate. Update all API calls accordingly.`
    }
  ]);

  readonly deploymentStrategies = signal<DeploymentStrategy[]>([
    {
      title: 'angular.deploymentStrategies.docker.title',
      description: 'angular.deploymentStrategies.docker.description',
      icon: 'sailing',
      steps: [
        'angular.deploymentStrategies.docker.step1',
        'angular.deploymentStrategies.docker.step2',
        'angular.deploymentStrategies.docker.step3',
        'angular.deploymentStrategies.docker.step4',
        'angular.deploymentStrategies.docker.step5'
      ],
      code: `# Multi-stage Dockerfile für Angular
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencies installieren
COPY package*.json ./
RUN npm ci --only=production

# Source kopieren und builden
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Production
FROM nginx:alpine

# Nginx Konfiguration kopieren
COPY nginx.conf /etc/nginx/nginx.conf

# Build Artefakte kopieren
COPY --from=builder /app/dist/my-app/browser /usr/share/nginx/html

# Port exposen
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

# nginx.conf
worker_processes auto;

events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_types text/plain text/css text/xml text/javascript 
             application/json application/javascript application/xml+rss;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }

    # Angular routing
    location / {
      try_files $uri $uri/ /index.html;
    }
  }
}

# docker-compose.yml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

# .dockerignore
node_modules
dist
.git
.angular
coverage
*.md
.vscode`
    },
    {
      title: 'angular.deploymentStrategies.cicd.title',
      description: 'angular.deploymentStrategies.cicd.description',
      icon: 'factory',
      steps: [
        'angular.deploymentStrategies.cicd.step1',
        'angular.deploymentStrategies.cicd.step2',
        'angular.deploymentStrategies.cicd.step3',
        'angular.deploymentStrategies.cicd.step4',
        'angular.deploymentStrategies.cicd.step5'
      ],
      code: `# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Check code formatting
        run: npm run format:check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:ci
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build -- --configuration=production
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/my-app/browser
          cname: www.example.com

# GitLab CI (.gitlab-ci.yml)
stages:
  - install
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "20"

cache:
  paths:
    - node_modules/

install:
  stage: install
  image: node:20
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

lint:
  stage: test
  image: node:20
  script:
    - npm run lint
    - npm run format:check

test:
  stage: test
  image: node:20
  script:
    - npm run test:ci
  coverage: '/Statements\\s+:\\s+(\\d+\\.\\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: node:20
  script:
    - npm run build -- --configuration=production
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:prod:
  stage: deploy
  image: node:20
  script:
    - npm install -g firebase-tools
    - firebase deploy --token \$FIREBASE_TOKEN
  only:
    - main
  environment:
    name: production
    url: https://app.example.com`
    },
    {
      title: 'angular.deploymentStrategies.envVariables.title',
      description: 'angular.deploymentStrategies.envVariables.description',
      icon: 'settings',
      steps: [
        'angular.deploymentStrategies.envVariables.step1',
        'angular.deploymentStrategies.envVariables.step2',
        'angular.deploymentStrategies.envVariables.step3',
        'angular.deploymentStrategies.envVariables.step4'
      ],
      code: `// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiKey: 'dev-api-key',
  enableDebug: true,
  version: '1.0.0-dev',
  features: {
    analytics: false,
    newFeature: true
  }
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com',
  apiKey: process.env['NG_APP_API_KEY'] || '',
  enableDebug: false,
  version: '1.0.0',
  features: {
    analytics: true,
    newFeature: false
  }
};

// angular.json - File replacements
{
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    },
    "staging": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.staging.ts"
        }
      ]
    }
  }
}

// Environment Service für runtime configuration
@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private config = signal<Config | null>(null);
  private http = inject(HttpClient);

  async loadConfig(): Promise<void> {
    try {
      const config = await firstValueFrom(
        this.http.get<Config>('/assets/config.json')
      );
      this.config.set(config);
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  }

  get apiUrl(): string {
    return this.config()?.apiUrl || environment.apiUrl;
  }

  get features(): Record<string, boolean> {
    return this.config()?.features || environment.features;
  }
}

// APP_INITIALIZER für runtime config
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (envService: EnvironmentService) => () => envService.loadConfig(),
      deps: [EnvironmentService],
      multi: true
    }
  ]
};

// Docker runtime environment variables
# entrypoint.sh
#!/bin/sh

# Generate config.json from environment variables
cat > /usr/share/nginx/html/assets/config.json << EOF
{
  "apiUrl": "$API_URL",
  "apiKey": "$API_KEY",
  "features": {
    "analytics": $ENABLE_ANALYTICS,
    "newFeature": $ENABLE_NEW_FEATURE
  }
}
EOF

nginx -g "daemon off;"`
    },
    {
      title: 'angular.deploymentStrategies.featureFlags.title',
      description: 'angular.deploymentStrategies.featureFlags.description',
      icon: 'flag',
      steps: [
        'angular.deploymentStrategies.featureFlags.step1',
        'angular.deploymentStrategies.featureFlags.step2',
        'angular.deploymentStrategies.featureFlags.step3',
        'angular.deploymentStrategies.featureFlags.step4'
      ],
      code: `// Feature Flag Service
@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private http = inject(HttpClient);
  private flags = signal<Record<string, boolean>>({});
  
  async loadFlags(): Promise<void> {
    try {
      const flags = await firstValueFrom(
        this.http.get<Record<string, boolean>>('/api/feature-flags')
      );
      this.flags.set(flags);
    } catch (error) {
      console.error('Failed to load feature flags:', error);
      // Fallback zu lokalen defaults
      this.flags.set({
        newDashboard: false,
        betaFeatures: false,
        advancedAnalytics: false
      });
    }
  }
  
  isEnabled(flag: string): boolean {
    return this.flags()[flag] ?? false;
  }
  
  // Computed signals für specific features
  readonly newDashboardEnabled = computed(() => this.isEnabled('newDashboard'));
  readonly betaFeaturesEnabled = computed(() => this.isEnabled('betaFeatures'));
}

// Feature Flag Directive
@Directive({
  selector: '[appFeatureFlag]',
  standalone: true
})
export class FeatureFlagDirective implements OnInit {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private featureFlags = inject(FeatureFlagService);
  
  @Input({ required: true }) appFeatureFlag!: string;
  @Input() appFeatureFlagElse?: TemplateRef<any>;
  
  ngOnInit() {
    effect(() => {
      const isEnabled = this.featureFlags.isEnabled(this.appFeatureFlag);
      
      this.viewContainer.clear();
      
      if (isEnabled) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (this.appFeatureFlagElse) {
        this.viewContainer.createEmbeddedView(this.appFeatureFlagElse);
      }
    });
  }
}

// Usage in templates
@Component({
  template: \`
    <!-- Simple feature flag -->
    <div *appFeatureFlag="'newDashboard'">
      <app-new-dashboard />
    </div>
    
    <!-- With else template -->
    <ng-container *appFeatureFlag="'betaFeatures'; else oldVersion">
      <app-beta-component />
    </ng-container>
    
    <ng-template #oldVersion>
      <app-stable-component />
    </ng-template>
    
    <!-- Control flow syntax -->
    @if (featureFlags.newDashboardEnabled()) {
      <app-new-dashboard />
    } @else {
      <app-old-dashboard />
    }
  \`,
  imports: [FeatureFlagDirective]
})
export class AppComponent {
  featureFlags = inject(FeatureFlagService);
}

// LaunchDarkly Integration
@Injectable({ providedIn: 'root' })
export class LaunchDarklyService {
  private client!: LDClient;
  private flags = signal<LDFlagSet>({});
  
  async initialize(clientId: string, context: LDContext): Promise<void> {
    this.client = initialize(clientId, context);
    
    await this.client.waitForInitialization();
    
    const allFlags = this.client.allFlags();
    this.flags.set(allFlags);
    
    // Listen for flag changes
    this.client.on('change', (settings) => {
      this.flags.update(current => ({...current, ...settings}));
    });
  }
  
  variation(key: string, defaultValue: any = false): any {
    return this.flags()[key] ?? defaultValue;
  }
}`
    },
    {
      title: 'angular.deploymentStrategies.monitoring.title',
      description: 'angular.deploymentStrategies.monitoring.description',
      icon: 'monitoring',
      steps: [
        'angular.deploymentStrategies.monitoring.step1',
        'angular.deploymentStrategies.monitoring.step2',
        'angular.deploymentStrategies.monitoring.step3',
        'angular.deploymentStrategies.monitoring.step4',
        'angular.deploymentStrategies.monitoring.step5'
      ],
      code: `// Sentry Error Tracking
import * as Sentry from '@sentry/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
        logErrors: true
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router]
    },
    provideRouter(routes, 
      withInMemoryScrolling(),
      withNavigationErrorHandler(error => {
        Sentry.captureException(error);
      })
    )
  ]
};

// main.ts
Sentry.init({
  dsn: environment.sentryDsn,
  environment: environment.production ? 'production' : 'development',
  tracesSampleRate: 1.0,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false
    })
  ],
  beforeSend(event, hint) {
    // Filter oder modify events
    if (event.exception) {
      console.error('Sending error to Sentry:', event);
    }
    return event;
  }
});

// Google Analytics 4
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private router = inject(Router);
  
  initialize(measurementId: string) {
    // Load gtag script
    const script = document.createElement('script');
    script.src = \`https://www.googletagmanager.com/gtag/js?id=\${measurementId}\`;
    script.async = true;
    document.head.appendChild(script);
    
    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', measurementId);
    
    // Track page views
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('config', measurementId, {
        page_path: event.urlAfterRedirects
      });
    });
  }
  
  trackEvent(action: string, category: string, label?: string, value?: number) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
  
  setUserId(userId: string) {
    (window as any).gtag('config', environment.gaId, {
      user_id: userId
    });
  }
}

// Performance Monitoring
@Injectable({ providedIn: 'root' })
export class PerformanceMonitoringService {
  
  trackPageLoad() {
    if ('performance' in window) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log('Performance Metrics:', {
        pageLoadTime,
        connectTime,
        renderTime
      });
      
      // Send to analytics
      this.sendMetric('page_load', pageLoadTime);
    }
  }
  
  measureComponentLoad(componentName: string) {
    return {
      start: () => performance.mark(\`\${componentName}-start\`),
      end: () => {
        performance.mark(\`\${componentName}-end\`);
        performance.measure(
          componentName,
          \`\${componentName}-start\`,
          \`\${componentName}-end\`
        );
        
        const measure = performance.getEntriesByName(componentName)[0];
        console.log(\`\${componentName} took \${measure.duration}ms\`);
        this.sendMetric(\`component_\${componentName}\`, measure.duration);
      }
    };
  }
  
  private sendMetric(name: string, value: number) {
    // Send to your analytics service
    (window as any).gtag('event', 'timing_complete', {
      name: name,
      value: Math.round(value),
      event_category: 'Performance'
    });
  }
}

// Custom Logger Service
@Injectable({ providedIn: 'root' })
export class LoggerService {
  private http = inject(HttpClient);
  
  log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Console log
    console[level](message, data);
    
    // Send to backend
    if (environment.production && level === 'error') {
      this.http.post('/api/logs', logEntry)
        .subscribe({
          error: err => console.error('Failed to send log:', err)
        });
    }
  }
  
  error(message: string, error?: any) {
    this.log('error', message, error);
    Sentry.captureMessage(message, {
      level: 'error',
      extra: { error }
    });
  }
}`
    }
  ]);

  readonly accessibilityPatterns = signal<AccessibilityPattern[]>([
    {
      title: 'angular.accessibility.ariaLabels.title',
      description: 'angular.accessibility.ariaLabels.description',
      icon: 'label',
      tips: [
        'angular.accessibility.ariaLabels.tip1',
        'angular.accessibility.ariaLabels.tip2',
        'angular.accessibility.ariaLabels.tip3',
        'angular.accessibility.ariaLabels.tip4'
      ],
      example: `<!-- ARIA Labels für Buttons und Links -->
<button 
  aria-label="Schließen" 
  (click)="close()">
  <mat-icon>close</mat-icon>
</button>

<a 
  href="/profile" 
  aria-label="Zum Benutzerprofil navigieren">
  <mat-icon>person</mat-icon>
</a>

<!-- ARIA Describedby für zusätzliche Informationen -->
<input 
  type="email" 
  id="email" 
  aria-describedby="email-hint"
  [(ngModel)]="email">
<span id="email-hint" class="hint">
  Wir werden Ihre E-Mail niemals weitergeben
</span>

<!-- ARIA Live Regions für dynamische Inhalte -->
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true">
  @if (successMessage()) {
    {{ successMessage() }}
  }
</div>

<!-- ARIA Expanded für Accordions -->
<button
  [attr.aria-expanded]="isExpanded()"
  [attr.aria-controls]="'panel-' + id"
  (click)="toggle()">
  {{ title() }}
  <mat-icon>{{ isExpanded() ? 'expand_less' : 'expand_more' }}</mat-icon>
</button>

<div 
  [id]="'panel-' + id"
  [hidden]="!isExpanded()"
  role="region"
  [attr.aria-labelledby]="'heading-' + id">
  <ng-content />
</div>

// Component
@Component({
  selector: 'app-accessible-accordion',
  template: '...'
})
export class AccessibleAccordionComponent {
  id = signal(crypto.randomUUID());
  isExpanded = signal(false);
  title = input.required<string>();
  
  toggle() {
    this.isExpanded.update(v => !v);
  }
}`
    },
    {
      title: 'angular.accessibility.keyboardNav.title',
      description: 'angular.accessibility.keyboardNav.description',
      icon: 'keyboard',
      tips: [
        'angular.accessibility.keyboardNav.tip1',
        'angular.accessibility.keyboardNav.tip2',
        'angular.accessibility.keyboardNav.tip3',
        'angular.accessibility.keyboardNav.tip4',
        'angular.accessibility.keyboardNav.tip5'
      ],
      example: `// Keyboard Navigation Directive
@Directive({
  selector: '[appKeyboardNav]',
  standalone: true,
  host: {
    '(keydown)': 'onKeyDown($event)',
    '[tabindex]': '0'
  }
})
export class KeyboardNavDirective {
  @Output() escapePressed = new EventEmitter<void>();
  @Output() enterPressed = new EventEmitter<void>();
  @Output() arrowUp = new EventEmitter<void>();
  @Output() arrowDown = new EventEmitter<void>();
  
  onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'Escape':
        this.escapePressed.emit();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.enterPressed.emit();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.arrowUp.emit();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.arrowDown.emit();
        break;
    }
  }
}

// List Navigation Component
@Component({
  selector: 'app-keyboard-list',
  template: \`
    <ul role="listbox" [attr.aria-activedescendant]="activeId()">
      @for (item of items(); track item.id; let i = $index) {
        <li
          [id]="'item-' + item.id"
          role="option"
          [class.active]="activeIndex() === i"
          [attr.aria-selected]="activeIndex() === i"
          (click)="selectItem(i)"
          (keydown)="handleKeyDown($event, i)">
          {{ item.label }}
        </li>
      }
    </ul>
  \`,
  host: {
    '(keydown)': 'handleListKeyDown($event)'
  }
})
export class KeyboardListComponent {
  items = input.required<ListItem[]>();
  activeIndex = signal(0);
  
  activeId = computed(() => 
    'item-' + this.items()[this.activeIndex()]?.id
  );
  
  handleListKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveUp();
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(0);
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(this.items().length - 1);
        break;
      case 'Enter':
        event.preventDefault();
        this.selectItem(this.activeIndex());
        break;
    }
  }
  
  private moveDown() {
    this.activeIndex.update(i => 
      Math.min(i + 1, this.items().length - 1)
    );
  }
  
  private moveUp() {
    this.activeIndex.update(i => Math.max(i - 1, 0));
  }
  
  selectItem(index: number) {
    console.log('Selected:', this.items()[index]);
  }
}`
    },
    {
      title: 'angular.accessibility.focusManagement.title',
      description: 'angular.accessibility.focusManagement.description',
      icon: 'highlight',
      tips: [
        'angular.accessibility.focusManagement.tip1',
        'angular.accessibility.focusManagement.tip2',
        'angular.accessibility.focusManagement.tip3',
        'angular.accessibility.focusManagement.tip4'
      ],
      example: `// Focus Trap Directive für Modals
@Directive({
  selector: '[appFocusTrap]',
  standalone: true
})
export class FocusTrapDirective implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private focusableElements: HTMLElement[] = [];
  private firstFocusable?: HTMLElement;
  private lastFocusable?: HTMLElement;
  
  ngAfterViewInit() {
    this.updateFocusableElements();
    this.firstFocusable?.focus();
    
    document.addEventListener('keydown', this.handleKeyDown);
  }
  
  private updateFocusableElements() {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    this.focusableElements = Array.from(
      this.elementRef.nativeElement.querySelectorAll(selectors)
    );
    
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[
      this.focusableElements.length - 1
    ];
  }
  
  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    
    const activeElement = document.activeElement as HTMLElement;
    
    if (event.shiftKey) {
      // Shift + Tab
      if (activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      // Tab
      if (activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  };
  
  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}

// Auto Focus Directive
@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements AfterViewInit {
  private elementRef = inject(ElementRef);
  
  @Input() appAutoFocus = true;
  @Input() focusDelay = 0;
  
  ngAfterViewInit() {
    if (this.appAutoFocus) {
      setTimeout(() => {
        this.elementRef.nativeElement.focus();
      }, this.focusDelay);
    }
  }
}

// Focus Management Service
@Injectable({ providedIn: 'root' })
export class FocusManagerService {
  private previousFocus?: HTMLElement;
  
  saveFocus() {
    this.previousFocus = document.activeElement as HTMLElement;
  }
  
  restoreFocus() {
    if (this.previousFocus) {
      this.previousFocus.focus();
      this.previousFocus = undefined;
    }
  }
  
  focusFirst(container: HTMLElement) {
    const firstFocusable = container.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }
}

// Modal Component mit Focus Management
@Component({
  selector: 'app-modal',
  template: \`
    @if (isOpen()) {
      <div class="modal-backdrop" (click)="close()">
        <div 
          class="modal-content" 
          appFocusTrap
          role="dialog"
          [attr.aria-labelledby]="'modal-title-' + id"
          [attr.aria-modal]="true"
          (click)="$event.stopPropagation()">
          <h2 [id]="'modal-title-' + id">{{ title() }}</h2>
          <ng-content />
          <button 
            appAutoFocus
            (click)="close()">
            Schließen
          </button>
        </div>
      </div>
    }
  \`,
  imports: [FocusTrapDirective, AutoFocusDirective]
})
export class ModalComponent {
  private focusManager = inject(FocusManagerService);
  
  id = crypto.randomUUID();
  isOpen = signal(false);
  title = input.required<string>();
  
  open() {
    this.focusManager.saveFocus();
    this.isOpen.set(true);
  }
  
  close() {
    this.isOpen.set(false);
    this.focusManager.restoreFocus();
  }
}`
    },
    {
      title: 'angular.accessibility.screenReader.title',
      description: 'angular.accessibility.screenReader.description',
      icon: 'record_voice_over',
      tips: [
        'angular.accessibility.screenReader.tip1',
        'angular.accessibility.screenReader.tip2',
        'angular.accessibility.screenReader.tip3',
        'angular.accessibility.screenReader.tip4',
        'angular.accessibility.screenReader.tip5'
      ],
      example: `// Screen Reader Only CSS
/* styles.scss */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Live Announcer Service
@Injectable({ providedIn: 'root' })
export class LiveAnnouncerService {
  private liveRegion?: HTMLElement;
  
  constructor() {
    this.createLiveRegion();
  }
  
  private createLiveRegion() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    document.body.appendChild(this.liveRegion);
  }
  
  announce(message: string, politeness: 'polite' | 'assertive' = 'polite') {
    if (!this.liveRegion) return;
    
    this.liveRegion.setAttribute('aria-live', politeness);
    this.liveRegion.textContent = '';
    
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 100);
  }
}

// Component mit Screen Reader Unterstützung
@Component({
  selector: 'app-form-validation',
  template: \`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-field">
        <label for="email">E-Mail</label>
        <input 
          id="email" 
          type="email" 
          formControlName="email"
          [attr.aria-invalid]="emailInvalid()"
          [attr.aria-describedby]="emailInvalid() ? 'email-error' : null">
        
        @if (emailInvalid()) {
          <span 
            id="email-error" 
            class="error" 
            role="alert">
            {{ emailError() }}
          </span>
        }
      </div>
      
      <button 
        type="submit"
        [disabled]="form.invalid"
        [attr.aria-disabled]="form.invalid">
        Absenden
      </button>
      
      <!-- Screen Reader Fortschrittsanzeige -->
      <div 
        role="progressbar"
        [attr.aria-valuenow]="progress()"
        aria-valuemin="0"
        aria-valuemax="100"
        [attr.aria-label]="'Upload Fortschritt: ' + progress() + '%'">
        <span class="sr-only">
          Upload {{ progress() }}% abgeschlossen
        </span>
      </div>
    </form>
  \`
})
export class FormValidationComponent {
  private announcer = inject(LiveAnnouncerService);
  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  
  progress = signal(0);
  
  emailInvalid = computed(() => {
    const control = this.form.get('email');
    return control?.invalid && control?.touched;
  });
  
  emailError = computed(() => {
    const control = this.form.get('email');
    if (control?.hasError('required')) {
      return 'E-Mail ist erforderlich';
    }
    if (control?.hasError('email')) {
      return 'Ungültige E-Mail Adresse';
    }
    return '';
  });
  
  submit() {
    if (this.form.valid) {
      this.announcer.announce('Formular erfolgreich gesendet', 'polite');
    } else {
      this.announcer.announce(
        'Formular enthält Fehler. Bitte korrigieren Sie die markierten Felder.',
        'assertive'
      );
    }
  }
}`
    }
  ]);

  readonly commonPitfalls = signal<CommonPitfall[]>([
    {
      title: 'angular.pitfalls.memoryLeaks.title',
      description: 'angular.pitfalls.memoryLeaks.description',
      icon: 'memory',
      problem: `// ❌ FALSCH - Memory Leak durch nicht abgemeldete Subscription
@Component({...})
export class LeakyComponent implements OnInit {
  private http = inject(HttpClient);
  
  ngOnInit() {
    // Subscription wird nie abgemeldet!
    this.http.get('/api/data').subscribe(data => {
      console.log(data);
    });
    
    // Interval läuft weiter nach Component Destroy
    setInterval(() => {
      console.log('Tick');
    }, 1000);
  }
}

// ❌ FALSCH - Event Listener nicht entfernt
@Component({...})
export class EventLeakComponent implements OnInit {
  ngOnInit() {
    window.addEventListener('resize', this.onResize);
  }
  
  onResize() {
    console.log('Window resized');
  }
}`,
      solution: `// ✅ RICHTIG - Mit takeUntilDestroyed
@Component({...})
export class CleanComponent implements OnInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    // Automatisch abgemeldet bei Component Destroy
    this.http.get('/api/data')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log(data);
      });
    
    // Mit Signal und effect (automatisch aufgeräumt)
    effect(() => {
      const intervalId = setInterval(() => {
        console.log('Tick:', this.counter());
      }, 1000);
      
      // Cleanup bei effect destroy
      return () => clearInterval(intervalId);
    });
  }
  
  counter = signal(0);
}

// ✅ RICHTIG - Event Listener cleanup
@Component({
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class EventComponent {
  // Host binding räumt automatisch auf
  onResize() {
    console.log('Window resized');
  }
}

// ✅ RICHTIG - Oder mit DestroyRef
@Component({...})
export class ManualCleanupComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    const handler = () => console.log('Resize');
    window.addEventListener('resize', handler);
    
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', handler);
    });
  }
}`
    },
    {
      title: 'angular.pitfalls.changeDetection.title',
      description: 'angular.pitfalls.changeDetection.description',
      icon: 'update',
      problem: `// ❌ FALSCH - OnPush mit mutierten Arrays
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrokenOnPushComponent {
  items = signal<Item[]>([]);
  
  addItem(item: Item) {
    // Mutation erkennt OnPush nicht!
    this.items().push(item);
  }
  
  updateItem(index: number, newItem: Item) {
    // Auch das ist eine Mutation!
    this.items()[index] = newItem;
  }
}

// ❌ FALSCH - Objekt-Mutation in Signals
@Component({...})
export class ObjectMutationComponent {
  user = signal({ name: 'John', age: 30 });
  
  updateAge() {
    // Mutation wird nicht erkannt!
    this.user().age = 31;
  }
}

// ❌ FALSCH - Method calls in templates
@Component({
  template: \`
    <!-- Diese Methode wird bei jeder Change Detection aufgerufen! -->
    @for (item of getFilteredItems(); track item.id) {
      <div>{{ item.name }}</div>
    }
  \`
})
export class ExpensiveMethodComponent {
  items = signal<Item[]>([]);
  filter = signal('');
  
  getFilteredItems() {
    console.log('Filtering...'); // Wird sehr oft aufgerufen!
    return this.items().filter(item => 
      item.name.includes(this.filter())
    );
  }
}`,
      solution: `// ✅ RICHTIG - Immutable Updates mit Signals
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectOnPushComponent {
  items = signal<Item[]>([]);
  
  addItem(item: Item) {
    // Neues Array erstellen
    this.items.update(current => [...current, item]);
  }
  
  updateItem(index: number, newItem: Item) {
    this.items.update(current => 
      current.map((item, i) => i === index ? newItem : item)
    );
  }
  
  removeItem(id: string) {
    this.items.update(current => 
      current.filter(item => item.id !== id)
    );
  }
}

// ✅ RICHTIG - Immutable Objekt-Updates
@Component({...})
export class ImmutableObjectComponent {
  user = signal({ name: 'John', age: 30 });
  
  updateAge() {
    // Neues Objekt erstellen
    this.user.update(current => ({
      ...current,
      age: 31
    }));
  }
  
  updateName(name: string) {
    this.user.update(current => ({ ...current, name }));
  }
}

// ✅ RICHTIG - Computed für teure Berechnungen
@Component({
  template: \`
    <!-- Computed cached das Ergebnis! -->
    @for (item of filteredItems(); track item.id) {
      <div>{{ item.name }}</div>
    }
  \`
})
export class OptimizedComponent {
  items = signal<Item[]>([]);
  filter = signal('');
  
  // Wird nur neu berechnet wenn items oder filter sich ändert
  filteredItems = computed(() => {
    console.log('Filtering...'); // Nur bei Änderungen!
    return this.items().filter(item => 
      item.name.includes(this.filter())
    );
  });
}`
    },
    {
      title: 'angular.pitfalls.zoneJs.title',
      description: 'angular.pitfalls.zoneJs.description',
      icon: 'animation',
      problem: `// ❌ FALSCH - Zu viele Change Detection Durchläufe
@Component({...})
export class FrequentUpdatesComponent implements OnInit {
  position = { x: 0, y: 0 };
  
  ngOnInit() {
    // Triggert Change Detection bei jeder Mausbewegung!
    document.addEventListener('mousemove', (e) => {
      this.position = { x: e.clientX, y: e.clientY };
    });
  }
}

// ❌ FALSCH - setInterval triggert unnötige CD
@Component({...})
export class TimerComponent implements OnInit {
  time = new Date();
  
  ngOnInit() {
    // Change Detection jede Sekunde, auch wenn nicht sichtbar!
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}`,
      solution: `// ✅ RICHTIG - Zone.js umgehen mit runOutsideAngular
@Component({...})
export class OptimizedEventsComponent implements OnInit {
  private ngZone = inject(NgZone);
  position = signal({ x: 0, y: 0 });
  
  ngOnInit() {
    // Läuft außerhalb von Zone.js
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', (e) => {
        // Nur bei Bedarf Change Detection triggern
        if (this.shouldUpdate(e)) {
          this.ngZone.run(() => {
            this.position.set({ x: e.clientX, y: e.clientY });
          });
        }
      });
    });
  }
  
  private shouldUpdate(e: MouseEvent): boolean {
    const current = this.position();
    return Math.abs(e.clientX - current.x) > 10 ||
           Math.abs(e.clientY - current.y) > 10;
  }
}

// ✅ RICHTIG - RxJS throttle für häufige Updates
@Component({...})
export class ThrottledComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  position = signal({ x: 0, y: 0 });
  
  ngOnInit() {
    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        throttleTime(100), // Nur alle 100ms
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(e => {
        this.position.set({ x: e.clientX, y: e.clientY });
      });
  }
}

// ✅ RICHTIG - Zoneless Angular (experimentell in v20)
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
};

@Component({
  selector: 'app-zoneless',
  template: \`
    <!-- Signals funktionieren perfekt ohne Zone.js -->
    <p>Count: {{ count() }}</p>
    <button (click)="increment()">+</button>
  \`
})
export class ZonelessComponent {
  count = signal(0);
  
  increment() {
    this.count.update(c => c + 1);
  }
}`
    },
    {
      title: 'angular.pitfalls.antiPatterns.title',
      description: 'angular.pitfalls.antiPatterns.description',
      icon: 'warning',
      problem: `// ❌ FALSCH - Logic in Templates
@Component({
  template: \`
    <div *ngIf="user && user.role === 'admin' && user.permissions.includes('edit')">
      Admin Content
    </div>
  \`
})

// ❌ FALSCH - Zu viele Abhängigkeiten
@Component({...})
export class GodComponent {
  private service1 = inject(Service1);
  private service2 = inject(Service2);
  private service3 = inject(Service3);
  private service4 = inject(Service4);
  private service5 = inject(Service5);
  // ... 20 weitere Services
}

// ❌ FALSCH - Direct DOM Manipulation
@Component({...})
export class DirectDomComponent {
  ngAfterViewInit() {
    document.getElementById('myElement')!.style.color = 'red';
    document.querySelector('.my-class')!.innerHTML = 'New content';
  }
}

// ❌ FALSCH - Business Logic in Component
@Component({...})
export class BusinessLogicComponent {
  calculatePrice(item: Item) {
    let price = item.basePrice;
    if (item.category === 'electronics') {
      price *= 1.2;
    }
    if (item.inStock) {
      price *= 0.95;
    }
    return price * (1 + this.taxRate);
  }
}`,
      solution: `// ✅ RICHTIG - Computed Properties
@Component({
  template: \`
    @if (isAdmin()) {
      <div>Admin Content</div>
    }
  \`
})
export class CleanTemplateComponent {
  user = input.required<User>();
  
  isAdmin = computed(() => {
    const u = this.user();
    return u?.role === 'admin' && 
           u?.permissions.includes('edit');
  });
}

// ✅ RICHTIG - Facade Pattern
@Injectable({ providedIn: 'root' })
export class UserFacadeService {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private settingsService = inject(SettingsService);
  
  // Kombinierte API
  getUserData() {
    return combineLatest([
      this.authService.currentUser$,
      this.profileService.profile$,
      this.settingsService.settings$
    ]);
  }
}

@Component({...})
export class SimplifiedComponent {
  private facade = inject(UserFacadeService);
  userData$ = this.facade.getUserData();
}

// ✅ RICHTIG - Renderer2 für DOM Manipulation
@Component({...})
export class SafeDomComponent implements AfterViewInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  
  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;
    this.renderer.setStyle(element, 'color', 'red');
    this.renderer.setProperty(element, 'textContent', 'New content');
  }
}

// ✅ RICHTIG - Business Logic in Service
@Injectable({ providedIn: 'root' })
export class PricingService {
  private readonly TAX_RATE = 0.19;
  private readonly CATEGORY_MULTIPLIERS = {
    electronics: 1.2,
    clothing: 1.1,
    food: 1.0
  };
  
  calculatePrice(item: Item): number {
    let price = item.basePrice;
    
    price *= this.CATEGORY_MULTIPLIERS[item.category] ?? 1.0;
    
    if (item.inStock) {
      price *= 0.95; // 5% Rabatt
    }
    
    return price * (1 + this.TAX_RATE);
  }
}

@Component({...})
export class CleanComponent {
  private pricingService = inject(PricingService);
  
  item = input.required<Item>();
  
  price = computed(() => 
    this.pricingService.calculatePrice(this.item())
  );
}`
    }
  ]);

  readonly resources = signal<Resource[]>([
    {
      title: 'angular.resources.official.title',
      description: 'angular.resources.official.description',
      icon: 'book',
      links: [
        { name: 'Angular.dev', url: 'https://angular.dev' },
        { name: 'Angular GitHub', url: 'https://github.com/angular/angular' },
        { name: 'Angular Material', url: 'https://material.angular.io' },
        { name: 'Angular CLI', url: 'https://angular.dev/tools/cli' },
        { name: 'Angular Blog', url: 'https://blog.angular.dev' }
      ]
    },
    {
      title: 'angular.resources.community.title',
      description: 'angular.resources.community.description',
      icon: 'groups',
      links: [
        { name: 'Angular Community', url: 'https://community.angular.io' },
        { name: 'r/Angular Reddit', url: 'https://reddit.com/r/angular' },
        { name: 'Angular Discord', url: 'https://discord.gg/angular' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com/questions/tagged/angular' },
        { name: 'Angular Meetups', url: 'https://www.meetup.com/topics/angularjs/' }
      ]
    },
    {
      title: 'angular.resources.learning.title',
      description: 'angular.resources.learning.description',
      icon: 'school',
      links: [
        { name: 'Angular University', url: 'https://angular-university.io' },
        { name: 'Ultimate Angular', url: 'https://ultimatecourses.com/angular' },
        { name: 'Pluralsight Angular Path', url: 'https://www.pluralsight.com/paths/angular' },
        { name: 'Udemy Angular Courses', url: 'https://www.udemy.com/topic/angular/' },
        { name: 'egghead.io Angular', url: 'https://egghead.io/q/angular' }
      ]
    },
    {
      title: 'angular.resources.youtube.title',
      description: 'angular.resources.youtube.description',
      icon: 'play_circle',
      links: [
        { name: 'Angular YouTube Channel', url: 'https://www.youtube.com/@Angular' },
        { name: 'Fireship Angular', url: 'https://www.youtube.com/@Fireship' },
        { name: 'Decoded Frontend', url: 'https://www.youtube.com/@DecodedFrontend' },
        { name: 'Joshua Morony', url: 'https://www.youtube.com/@JoshuaMorony' },
        { name: 'Tomas Trajan', url: 'https://www.youtube.com/@TomasTrajan' }
      ]
    },
    {
      title: 'angular.resources.blogs.title',
      description: 'angular.resources.blogs.description',
      icon: 'article',
      links: [
        { name: 'Angular Blog', url: 'https://blog.angular.dev' },
        { name: 'This is Angular', url: 'https://dev.to/t/angular' },
        { name: 'Angular Experts', url: 'https://angularexperts.io/blog' },
        { name: 'Ninja Squad Blog', url: 'https://blog.ninja-squad.com' },
        { name: 'Netanel Basal Medium', url: 'https://netbasal.medium.com' }
      ]
    },
    {
      title: 'angular.resources.tools.title',
      description: 'angular.resources.tools.description',
      icon: 'build',
      links: [
        { name: 'Angular DevTools', url: 'https://angular.dev/tools/devtools' },
        { name: 'StackBlitz', url: 'https://stackblitz.com' },
        { name: 'CodeSandbox', url: 'https://codesandbox.io' },
        { name: 'Angular Playground', url: 'https://angularplayground.it' },
        { name: 'Compodoc', url: 'https://compodoc.app' }
      ]
    },
    {
      title: 'angular.resources.libraries.title',
      description: 'angular.resources.libraries.description',
      icon: 'widgets',
      links: [
        { name: 'Angular Material', url: 'https://material.angular.io' },
        { name: 'NgRx', url: 'https://ngrx.io' },
        { name: 'RxJS', url: 'https://rxjs.dev' },
        { name: 'Transloco', url: 'https://ngneat.github.io/transloco/' },
        { name: 'Taiga UI', url: 'https://taiga-ui.dev' },
        { name: 'PrimeNG', url: 'https://primeng.org' },
        { name: 'Nebular', url: 'https://akveo.github.io/nebular/' },
        { name: 'NG-ZORRO', url: 'https://ng.ant.design' }
      ]
    },
    {
      title: 'angular.resources.newsletters.title',
      description: 'angular.resources.newsletters.description',
      icon: 'mail',
      links: [
        { name: 'Angular Weekly', url: 'https://www.angularweekly.com' },
        { name: 'This Week in Angular', url: 'https://thisweekinangular.com' },
        { name: 'ng-newsletter', url: 'https://www.ng-newsletter.com' }
      ]
    }
  ]);

  openFeatureDetail(feature: AngularFeature): void {
    this.dialog.open(FeatureDetailDialogComponent, {
      data: feature,
      width: '700px',
      maxWidth: '90vw',
      autoFocus: 'dialog',
      restoreFocus: true
    });
  }

  openPracticeDetail(practice: BestPractice): void {
    this.dialog.open(BestPracticeDialogComponent, {
      data: practice,
      width: '750px',
      maxWidth: '90vw',
      autoFocus: 'dialog',
      restoreFocus: true
    });
  }

  openAdvancedTopic(topic: AdvancedTopic): void {
    this.dialog.open(AdvancedTopicDialogComponent, {
      data: topic,
      width: '750px',
      maxWidth: '90vw',
      autoFocus: 'dialog',
      restoreFocus: true
    });
  }

  openArchitecturePattern(pattern: ArchitecturePattern): void {
    this.dialog.open(ArchitecturePatternDialogComponent, {
      data: pattern,
      width: '750px',
      maxWidth: '90vw',
      autoFocus: 'dialog',
      restoreFocus: true
    });
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
