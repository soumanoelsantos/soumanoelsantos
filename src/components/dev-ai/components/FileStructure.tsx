
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  content?: string;
}

interface FileStructureProps {
  onFileSelect: (content: string, fileName: string) => void;
  generatedCode: string;
}

const FileStructure: React.FC<FileStructureProps> = ({ onFileSelect, generatedCode }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  // Função para extrair estrutura de arquivos do código gerado
  const extractFileStructure = (code: string): FileItem[] => {
    if (!code || code.trim().length === 0) {
      return [{
        name: 'index.html',
        type: 'file',
        content: 'Nenhum código gerado ainda'
      }];
    }

    // Se é um HTML completo, criar estrutura básica
    if (code.includes('<!DOCTYPE html>') || code.includes('<html')) {
      return [
        {
          name: 'public',
          type: 'folder',
          children: [
            {
              name: 'index.html',
              type: 'file',
              content: code
            }
          ]
        },
        {
          name: 'src',
          type: 'folder',
          children: [
            {
              name: 'styles',
              type: 'folder',
              children: [
                {
                  name: 'main.css',
                  type: 'file',
                  content: '/* Estilos extraídos do HTML */'
                }
              ]
            },
            {
              name: 'components',
              type: 'folder',
              children: []
            }
          ]
        }
      ];
    }

    // Para outros tipos de código, criar estrutura simples
    return [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'main.js',
            type: 'file',
            content: code
          },
          {
            name: 'components',
            type: 'folder',
            children: [
              {
                name: 'App.js',
                type: 'file',
                content: '// Componente principal'
              }
            ]
          },
          {
            name: 'styles',
            type: 'folder',
            children: [
              {
                name: 'main.css',
                type: 'file',
                content: '/* Estilos do projeto */'
              }
            ]
          }
        ]
      }
    ];
  };

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item, index) => (
      <div key={`${item.name}-${level}-${index}`} style={{ marginLeft: `${level * 16}px` }}>
        <div 
          className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer rounded text-sm ${
            item.type === 'file' ? 'text-gray-700' : 'text-gray-900 font-medium'
          }`}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.name);
            } else if (item.content) {
              onFileSelect(item.content, item.name);
            }
          }}
        >
          {item.type === 'folder' ? (
            <>
              {expandedFolders.has(item.name) ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
            </>
          ) : (
            <>
              <div className="w-4 mr-1" />
              <File className="h-4 w-4 mr-2 text-gray-500" />
            </>
          )}
          <span>{item.name}</span>
        </div>
        {item.type === 'folder' && expandedFolders.has(item.name) && item.children && (
          <div>
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const fileStructure = extractFileStructure(generatedCode);

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Arquivos do Projeto</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {renderFileTree(fileStructure)}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FileStructure;
