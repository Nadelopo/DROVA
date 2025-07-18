export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)'
  }
  public: {
    Tables: {
      chats: {
        Row: {
          created_at: string
          id: number
          type: Database['public']['Enums']['chat_type']
        }
        Insert: {
          created_at?: string
          id?: number
          type: Database['public']['Enums']['chat_type']
        }
        Update: {
          created_at?: string
          id?: number
          type?: Database['public']['Enums']['chat_type']
        }
        Relationships: []
      }
      chats_users: {
        Row: {
          chat_it: number
          created_at: string
          custom_avatar: string
          custom_name: string
          id: number
          is_deleted: boolean
          is_muted: boolean
          role: Database['public']['Enums']['chat_role']
          user_id: number
        }
        Insert: {
          chat_it: number
          created_at?: string
          custom_avatar: string
          custom_name: string
          id?: number
          is_deleted: boolean
          is_muted: boolean
          role: Database['public']['Enums']['chat_role']
          user_id: number
        }
        Update: {
          chat_it?: number
          created_at?: string
          custom_avatar?: string
          custom_name?: string
          id?: number
          is_deleted?: boolean
          is_muted?: boolean
          role?: Database['public']['Enums']['chat_role']
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'chats_users_chat_it_fkey'
            columns: ['chat_it']
            isOneToOne: false
            referencedRelation: 'chats'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'chats_users_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      messages: {
        Row: {
          chat_id: number
          content: string
          created_at: string
          id: number
          media_url: string | null
          message_type: string
          sender_id: number
        }
        Insert: {
          chat_id: number
          content: string
          created_at?: string
          id?: number
          media_url?: string | null
          message_type: string
          sender_id: number
        }
        Update: {
          chat_id?: number
          content?: string
          created_at?: string
          id?: number
          media_url?: string | null
          message_type?: string
          sender_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'messages_chat_id_fkey'
            columns: ['chat_id']
            isOneToOne: false
            referencedRelation: 'chats'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          id: number
          name: string
          surname: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id?: number
          name: string
          surname: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: number
          name?: string
          surname?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      chat_role: 'admin' | 'member' | 'owner'
      chat_type: 'private' | 'group' | 'channel'
      message_type: 'text' | 'image' | 'video' | 'audio' | 'voice' | 'file' | 'system'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      chat_role: ['admin', 'member', 'owner'],
      chat_type: ['private', 'group', 'channel'],
      message_type: ['text', 'image', 'video', 'audio', 'voice', 'file', 'system'],
    },
  },
} as const

type UsersRead = Tables<'users'>
type UsersCreate = TablesInsert<'users'>
type UsersUpdate = TablesUpdate<'users'>

type ChatsRead = Tables<'chats'>
type ChatsCreate = TablesInsert<'chats'>
type ChatsUpdate = TablesUpdate<'chats'>

type ChatsUsersRead = Tables<'chats_users'>
type ChatsUsersCreate = TablesInsert<'chats_users'>
type ChatsUsersUpdate = TablesUpdate<'chats_users'>

type MessagesRead = Tables<'messages'>
type MessagesCreate = TablesInsert<'messages'>
type MessagesUpdate = TablesUpdate<'messages'>

export type {
  UsersRead,
  UsersCreate,
  UsersUpdate,
  ChatsRead,
  ChatsCreate,
  ChatsUpdate,
  ChatsUsersRead,
  ChatsUsersCreate,
  ChatsUsersUpdate,
  MessagesRead,
  MessagesCreate,
  MessagesUpdate,
}
