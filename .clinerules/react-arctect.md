# Arquitetura React - Diretrizes de Desenvolvimento

Este documento estabelece as regras arquiteturais e melhores práticas para desenvolvimento React no projeto.

## 1. Estrutura de Pastas

### 1.1 Organização de Componentes

```
src/
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes genéricos (Button, Input, Modal)
│   ├── ui/            # Componentes de interface (Cards, Lists, Forms)
│   └── layout/        # Componentes de layout (Header, Footer, Sidebar)
├── pages/             # Páginas/rotas principais
├── hooks/             # Hooks personalizados
├── services/          # Camada de serviços/API
├── utils/             # Funções utilitárias
├── types/             # Tipagens TypeScript
└── styles/            # Estilos globais e temas
```

### 1.2 Convenções de Nomes

- **Componentes**: PascalCase (ex: `Button`, `UserCard`)
- **Arquivos**: Mesmo nome do componente exportado
- **Pastas**: Sempre criar index.ts para exports
- **Hooks**: useCamelCase (ex: `useAuth`, `useLocalStorage`)

## 2. Tipos de Componentes

### 2.1 Componentes de UI (Dumb Components)

**Características:**
- Recebem props e retornam JSX
- Não têm estado interno
- São puros e previsíveis
- Fáceis de testar

**Exemplo:**
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 2.2 Componentes de Negócio (Smart Components)

**Características:**
- Gerenciam estado e lógica de negócios
- Fazem chamadas a APIs
- Combinam componentes de UI
- São específicos de página/funcionalidade

**Exemplo:**
```tsx
export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({});
  const { saveUser, loading } = useUserService();

  const handleSubmit = async () => {
    await saveUser(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        Salvar
      </Button>
    </Form>
  );
};
```

## 3. Sistema de Componentes

### 3.1 Componentes Básicos

#### Botões
```tsx
// src/components/common/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button'
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};
```

#### Inputs
```tsx
// src/components/common/Input.tsx
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false
}) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`input ${error ? 'input--error' : ''}`}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};
```

### 3.2 Componentes de Interface

#### Cards
```tsx
// src/components/ui/Card.tsx
interface CardProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  actions,
  variant = 'default'
}) => {
  return (
    <div className={`card card--${variant}`}>
      {title && <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {actions && <div className="card-actions">{actions}</div>}
      </div>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};
```

#### Listas
```tsx
// src/components/ui/List.tsx
interface ListItem {
  id: string | number;
  [key: string]: any;
}

interface ListProps<T extends ListItem> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  loading?: boolean;
}

export const List = <T extends ListItem>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'Nenhum item encontrado',
  loading = false
}: ListProps<T>) => {
  if (loading) {
    return <div className="list-loading">Carregando...</div>;
  }

  if (items.length === 0) {
    return <div className="list-empty">{emptyMessage}</div>;
  }

  return (
    <div className="list">
      {items.map((item) => (
        <div key={keyExtractor(item)} className="list-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};
```

#### Formulários
```tsx
// src/components/ui/Form.tsx
interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  loading = false,
  disabled = false
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {children}
      <div className="form-actions">
        <Button 
          type="submit" 
          disabled={disabled || loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};
```

## 4. Gerenciamento de Estado

### 4.1 Estratégia de Estado

**Regras:**
- Use `useState` para estado local de componentes
- Use `useContext` para estado global simples
- Use Redux/Zustand para estado complexo e compartilhado
- Evite estado global desnecessário

### 4.2 Context API

```tsx
// src/contexts/AuthContext.tsx
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthState & AuthActions | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: false
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await authService.login(credentials);
      setState({
        user: response.user,
        token: response.token,
        loading: false
      });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    logout: () => setState({ user: null, token: null, loading: false }),
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

## 5. Tipagem TypeScript

### 5.1 Interfaces e Types

```tsx
// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};
```

### 5.2 Tipagem de Componentes

```tsx
interface Props {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  // Component implementation
};
```

## 6. Estilização

### 6.1 Estratégia de Estilos

**Opções recomendadas:**
- **CSS Modules**: Para estilos isolados por componente
- **Styled Components**: Para estilos dinâmicos e reutilizáveis
- **Tailwind CSS**: Para desenvolvimento rápido e consistente

### 6.2 Exemplo com CSS Modules

```css
/* Button.module.css */
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.button--primary {
  background-color: #007bff;
  color: white;
}

.button--primary:hover {
  background-color: #0056b3;
}

.button--secondary {
  background-color: #6c757d;
  color: white;
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', disabled, children }) => {
  return (
    <button 
      className={`${styles.button} ${styles[`button--${variant}`]} ${disabled ? styles['button--disabled'] : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

## 7. Hooks Personalizados

### 7.1 Estrutura de Hooks

```tsx
// src/hooks/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};
```

### 7.2 Hooks de Dados

```tsx
// src/hooks/useApi.ts
export const useApi = <T>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
```

## 8. Testes

### 8.1 Estratégia de Testes

**Níveis de teste:**
- **Unitários**: Componentes individuais e funções
- **Integração**: Fluxos de usuário e integração com APIs
- **E2E**: Fluxos completos da aplicação

### 8.2 Exemplo de Teste Unitário

```tsx
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

## 9. Performance

### 9.1 Otimizações

**Memoização:**
```tsx
const ExpensiveComponent = ({ data }: { data: LargeDataSet }) => {
  const expensiveValue = useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
};
```

**Renderização Condicional:**
```tsx
const LazyComponent = lazy(() => import('./HeavyComponent'));

const App = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      {showHeavy && (
        <Suspense fallback={<div>Carregando...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
};
```

## 10. Convenções de Código

### 10.1 ESLint e Prettier

```json
// .eslintrc.json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### 10.2 Git Conventions

**Conventional Commits:**
- `feat: nova funcionalidade`
- `fix: correção de bug`
- `docs: alterações na documentação`
- `refactor: refatoração`
- `test: adição ou correção de testes`
- `chore: mudanças no build ou dependências`

## 11. Documentação

### 11.1 JSDoc

```tsx
/**
 * Componente de botão reutilizável
 * @param {ButtonProps} props - Propriedades do botão
 * @returns {JSX.Element} Elemento de botão renderizado
 */
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  // Implementation
};
```

### 11.2 Storybook

```tsx
// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'danger'] }
    }
  }
};

export const Primary = {
  args: {
    children: 'Botão Primário',
    variant: 'primary'
  }
};
```

## 12. Deploy e Build

### 12.1 Configuração de Build

```json
// package.json
{
  "scripts": {
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit"
  }
}
```

### 12.2 CI/CD

**Workflow básico:**
1. Lint e typecheck
2. Testes unitários
3. Build da aplicação
4. Deploy em ambiente de staging
5. Testes de integração
6. Deploy em produção

Este guia deve ser seguido por todos os desenvolvedores React no projeto para garantir consistência, qualidade e manutenibilidade do código.