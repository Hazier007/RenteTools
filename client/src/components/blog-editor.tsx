import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BlogPostEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

export function BlogPostEditor({ content = '', onChange, placeholder = 'Start met schrijven...' }: BlogPostEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
    disabled,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
    disabled?: boolean;
  }) => (
    <Button
      type="button"
      variant={active ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`h-8 w-8 p-0 ${active ? 'bg-primary/20' : ''}`}
      data-testid={`toolbar-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {children}
    </Button>
  );

  return (
    <div className="w-full">
      <div className="glassmorphic rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

          <ToolbarButton
            onClick={() => setShowLinkDialog(true)}
            active={editor.isActive('link')}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => setShowImageDialog(true)}
            title="Add Image"
          >
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="bg-white dark:bg-gray-900">
          <EditorContent editor={editor} />
        </div>
      </div>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Toevoegen</DialogTitle>
            <DialogDescription>
              Voer de URL in voor de link
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLink();
                  }
                }}
                data-testid="input-link-url"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={addLink} data-testid="button-add-link">
              Link Toevoegen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Afbeelding Toevoegen</DialogTitle>
            <DialogDescription>
              Voer de URL in voor de afbeelding
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImage();
                  }
                }}
                data-testid="input-image-url"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={addImage} data-testid="button-add-image">
              Afbeelding Toevoegen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
