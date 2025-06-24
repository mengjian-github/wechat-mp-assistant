// 主题类型定义
export interface Theme {
  name: string;
  description: string;
  primaryColor: string;
  base: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    color: string;
    letterSpacing: string;
  };
  headings: {
    h1: any;
    h2: any;
    h3: any;
  };
  paragraph: any;
  blockquote: any;
  list: any;
  link: any;
  code: any;
  table: any;
}

// 默认主题 - 科技蓝
const defaultTheme: Theme = {
  name: '科技蓝',
  description: '现代科技风格，适合技术类文章',
  primaryColor: '#1a73e8',
  base: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    lineHeight: '1.75',
    color: '#333333',
    letterSpacing: '0.03em',
  },
  headings: {
    h1: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#1a73e8',
      margin: '1.5em 0 1em',
      textAlign: 'center',
      borderBottom: '2px solid #1a73e8',
      paddingBottom: '0.5em',
    },
    h2: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#1a73e8',
      margin: '1.5em 0 0.8em',
      borderLeft: '4px solid #1a73e8',
      paddingLeft: '12px',
    },
    h3: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a73e8',
      margin: '1.2em 0 0.6em',
    },
  },
  paragraph: {
    margin: '1em 0',
    textIndent: '2em',
  },
  blockquote: {
    margin: '1.5em 0',
    padding: '1em 1.5em',
    borderLeft: '4px solid #1a73e8',
    backgroundColor: '#f5f9ff',
    color: '#4a5568',
    fontStyle: 'italic',
  },
  list: {
    margin: '1em 0',
    paddingLeft: '2em',
    lineHeight: '1.8',
  },
  link: {
    color: '#1a73e8',
    textDecoration: 'none',
    borderBottom: '1px solid #1a73e8',
  },
  code: {
    backgroundColor: '#f6f8fa',
    padding: '0.2em 0.4em',
    borderRadius: '3px',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '0.9em',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '1.5em 0',
  },
};

// 商务橙主题
const businessTheme: Theme = {
  name: '商务橙',
  description: '专业商务风格，适合商业内容',
  primaryColor: '#ff6b35',
  base: {
    fontFamily: '"Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#2c3e50',
    letterSpacing: '0.02em',
  },
  headings: {
    h1: {
      fontSize: '26px',
      fontWeight: '700',
      color: '#ff6b35',
      margin: '1.5em 0 1em',
      textAlign: 'left',
      borderBottom: '3px solid #ff6b35',
      paddingBottom: '0.5em',
    },
    h2: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ff6b35',
      margin: '1.3em 0 0.8em',
      backgroundColor: '#fff5f0',
      padding: '8px 16px',
      borderRadius: '4px',
    },
    h3: {
      fontSize: '17px',
      fontWeight: '600',
      color: '#ff6b35',
      margin: '1.2em 0 0.6em',
    },
  },
  paragraph: {
    margin: '1em 0',
    textIndent: '0',
  },
  blockquote: {
    margin: '1.5em 0',
    padding: '1em 1.5em',
    borderLeft: '4px solid #ff6b35',
    backgroundColor: '#fff9f6',
    color: '#5a6c7d',
  },
  list: {
    margin: '1em 0',
    paddingLeft: '1.5em',
    lineHeight: '1.9',
  },
  link: {
    color: '#ff6b35',
    textDecoration: 'none',
    fontWeight: '500',
  },
  code: {
    backgroundColor: '#fff5f0',
    padding: '0.2em 0.4em',
    borderRadius: '3px',
    color: '#c94922',
    fontSize: '0.9em',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '1.5em 0',
    border: '1px solid #ffd4c4',
  },
};

// 文艺紫主题
const elegantTheme: Theme = {
  name: '文艺紫',
  description: '优雅文艺风格，适合文学内容',
  primaryColor: '#9b59b6',
  base: {
    fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", serif',
    fontSize: '16px',
    lineHeight: '2',
    color: '#3a3a3a',
    letterSpacing: '0.05em',
  },
  headings: {
    h1: {
      fontSize: '30px',
      fontWeight: '300',
      color: '#9b59b6',
      margin: '2em 0 1em',
      textAlign: 'center',
      letterSpacing: '0.1em',
    },
    h2: {
      fontSize: '24px',
      fontWeight: '400',
      color: '#9b59b6',
      margin: '1.5em 0 0.8em',
      textAlign: 'center',
    },
    h3: {
      fontSize: '19px',
      fontWeight: '400',
      color: '#9b59b6',
      margin: '1.2em 0 0.6em',
    },
  },
  paragraph: {
    margin: '1.2em 0',
    textIndent: '2em',
    textAlign: 'justify',
  },
  blockquote: {
    margin: '2em 0',
    padding: '1.5em 2em',
    borderLeft: 'none',
    backgroundColor: '#f8f4fb',
    color: '#6c5b7b',
    fontStyle: 'italic',
    borderRadius: '8px',
  },
  list: {
    margin: '1.2em 0',
    paddingLeft: '2em',
    lineHeight: '2.2',
  },
  link: {
    color: '#9b59b6',
    textDecoration: 'none',
    borderBottom: '1px dotted #9b59b6',
  },
  code: {
    backgroundColor: '#f8f4fb',
    padding: '0.2em 0.4em',
    borderRadius: '3px',
    color: '#8e44ad',
    fontSize: '0.9em',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '2em 0',
    borderTop: '2px solid #9b59b6',
    borderBottom: '2px solid #9b59b6',
  },
};

// 清新绿主题
const freshTheme: Theme = {
  name: '清新绿',
  description: '清新自然风格，适合生活类文章',
  primaryColor: '#27ae60',
  base: {
    fontFamily: '"Source Han Sans CN", "Noto Sans CJK SC", sans-serif',
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#2c3e50',
    letterSpacing: '0.02em',
  },
  headings: {
    h1: {
      fontSize: '28px',
      fontWeight: '500',
      color: '#27ae60',
      margin: '1.5em 0 1em',
      textAlign: 'center',
      backgroundColor: '#e8f8f5',
      padding: '0.5em',
      borderRadius: '8px',
    },
    h2: {
      fontSize: '22px',
      fontWeight: '500',
      color: '#27ae60',
      margin: '1.5em 0 0.8em',
      borderBottom: '2px solid #27ae60',
      paddingBottom: '0.3em',
    },
    h3: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#27ae60',
      margin: '1.2em 0 0.6em',
    },
  },
  paragraph: {
    margin: '1em 0',
    lineHeight: '1.9',
  },
  blockquote: {
    margin: '1.5em 0',
    padding: '1em 1.5em',
    borderLeft: '4px solid #27ae60',
    backgroundColor: '#e8f8f5',
    color: '#2c3e50',
    borderRadius: '0 8px 8px 0',
  },
  list: {
    margin: '1em 0',
    paddingLeft: '2em',
    lineHeight: '2',
  },
  link: {
    color: '#27ae60',
    textDecoration: 'none',
    borderBottom: '1px solid #27ae60',
  },
  code: {
    backgroundColor: '#e8f8f5',
    padding: '0.2em 0.4em',
    borderRadius: '3px',
    color: '#1e8449',
    fontSize: '0.9em',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '1.5em 0',
  },
};

// 导出所有主题
export const themes: Record<string, Theme> = {
  default: defaultTheme,
  business: businessTheme,
  elegant: elegantTheme,
  fresh: freshTheme,
};
