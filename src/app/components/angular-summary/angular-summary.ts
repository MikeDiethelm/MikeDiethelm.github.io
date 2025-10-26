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

interface BestPractice {
    category: string;
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

    navigateHome(): void {
        this.router.navigate(['/']);
    }
}
