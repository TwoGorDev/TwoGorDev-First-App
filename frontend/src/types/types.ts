export type User = {
  avatar_url: string
  bio: string
  created_at: string
  email: string
  role: string
  token: string
  updated_at: string
  username: string
}

export type Product = {
  id: number
  name: string
  calories: number
  proteins: number
  carbohydrates: number
  fats: number
  created_at?: string
  updated_at?: string
  user_id?: number
}

export type Portion = {
  calories: number
  carbohydrates: number
  fats: number
  meal_id?: number
  meal_type?: string
  portion_id?: number
  product: string
  product_id: number
  proteins: number
  serving: number
  user_id?: number
  temporary_id?: number
}

export type Meal = Portion[]

export type UserNutritionNeeds = {
  calories: number
  proteins: number
  carbohydrates: number
  fats: number
}

export type DailyGoal = {
  created_at: Date
  daily_calories: number
  daily_carbohydrates: number
  daily_fats: number
  daily_proteins: number
  id: number
  user_id: number
}

export type UserData = {
  gender: string
  age: string
  weight: string
  height: string
  activity: string
  goal?: string
}

export type AuthFromData = {
  username: string
	password: string
	confirmPassword: string
	email: string
}

export type TogglePasswordObject = {
  password?: boolean
  confirmPassword?: boolean
  newPassword?: boolean
  confirmNewPassword?: boolean
}

export type UserAuthContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProductsContextType = {
  products: Product[] | []
  setProducts: React.Dispatch<React.SetStateAction<Product[] | []>>
  isPending: boolean
  error: string
  setEndpoint: React.Dispatch<React.SetStateAction<string>>
}

export type SummaryContextType = {
  isPending: boolean
  error: string
  summary: [Portion[], DailyGoal] | []
  setSummary: React.Dispatch<React.SetStateAction<[Portion[], DailyGoal] | []>>
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
}