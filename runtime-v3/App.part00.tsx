import {useEffect, useMemo, useState} from 'react';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {AppShell} from '@astryxdesign/core/AppShell';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {CommandPalette} from '@astryxdesign/core/CommandPalette';
import {DateRangeInput, type DateRange} from '@astryxdesign/core/DateRangeInput';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Icon} from '@astryxdesign/core/Icon';
import {Layout, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {NavIcon} from '@astryxdesign/core/NavIcon';
import {Pagination} from '@astryxdesign/core/Pagination';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Section} from '@astryxdesign/core/Section';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {SideNav, SideNavHeading, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Switch} from '@astryxdesign/core/Switch';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {Table, pixel, proportional, type TableColumn} from '@astryxdesign/core/Table';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {useToast} from '@astryxdesign/core/Toast';
import {TopNav, TopNavHeading} from '@astryxdesign/core/TopNav';
import {createStaticSource, type SearchableItem} from '@astryxdesign/core/Typeahead';
import {VStack} from '@astryxdesign/core/VStack';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

type PageKey = 'dashboard' | 'orders' | 'clients' | 'reports' | 'activity' | 'settings';
type OrderStatus = 'Taýýar' | 'Işlenýär' | 'Garaşylýar';
type ClientStatus = 'Işjeň' | 'Täze' | 'Dynçda';

type Order = Record<string, unknown> & {
  id: string;
  client: string;
  service: string;
  status: OrderStatus;
  price: string;
  date: string;
  description: string;
};

type Client = Record<string, unknown> & {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  total: string;
  status: ClientStatus;
  notes: string;
};

type Activity = {id: string; text: string; time: string; kind: 'info' | 'success' | 'warning'};

type Notification = {id: string; title: string; description: string; unread: boolean};

const initialOrders: Order[] = [
  {id: 'S-1048', client: 'Aýlar H.', service: 'Web dizaýn', status: 'Taýýar', price: '8 400 TMT', date: '15.07.2026', description: 'Korporatiw web sahypanyň täze görnüşi.'},
  {id: 'S-1047', client: 'Merdan A.', service: 'Katalog ulgamy', status: 'Işlenýär', price: '12 600 TMT', date: '14.07.2026', description: 'Haryt katalogy we admin dolandyryşy.'},
  {id: 'S-1046', client: 'Selbi B.', service: 'Admin panel', status: 'Garaşylýar', price: '6 200 TMT', date: '13.07.2026', description: 'Hasabat we ulanyjy dolandyryş paneli.'},
  {id: 'S-1045', client: 'Arslan D.', service: 'Mobil prototip', status: 'Işlenýär', price: '9 900 TMT', date: '12.07.2026', description: 'Telefon programmasynyň interaktiw prototipi.'},
  {id: 'S-1044', client: 'Jennet K.', service: 'Landing page', status: 'Taýýar', price: '4 800 TMT', date: '11.07.2026', description: 'Mahabat kampaniýasy üçin bir sahypalyk saýt.'},
  {id: 'S-1043', client: 'Begenç S.', service: 'CRM görnüşi', status: 'Garaşylýar', price: '15 300 TMT', date: '10.07.2026', description: 'Müşderi gatnaşyklaryny dolandyryş demo ulgamy.'},
  {id: 'S-1042', client: 'Oguljahan N.', service: 'Hasabat merkezi', status: 'Taýýar', price: '7 500 TMT', date: '09.07.2026', description: 'Maliýe hasabatlaryny jemleýän dashboard.'},
  {id: 'S-1041', client: 'Döwlet M.', service: 'Korporatiw saýt', status: 'Işlenýär', price: '10 100 TMT', date: '08.07.2026', description: 'Kompaniýa barada köp sahypalyk web saýt.'},
];

const initialClients: Client[] = [
  {id: 'M-201', name: 'Aýlar H.', email: 'aylar@example.com', phone: '+993 65 12 34 56', orders: 4, total: '28 400 TMT', status: 'Işjeň', notes: 'Dizaýn we katalog işleri bilen gyzyklanýar.'},
  {id: 'M-202', name: 'Merdan A.', email: 'merdan@example.com', phone: '+993 62 23 45 67', orders: 2, total: '18 600 TMT', status: 'Işjeň', notes: 'Katalog taslamasynyň esasy müşderisi.'},
  {id: 'M-203', name: 'Selbi B.', email: 'selbi@example.com', phone: '+993 64 34 56 78', orders: 1, total: '6 200 TMT', status: 'Täze', notes: 'Täze admin panel sargydy bar.'},
  {id: 'M-204', name: 'Arslan D.', email: 'arslan@example.com', phone: '+993 61 45 67 89', orders: 3, total: '21 900 TMT', status: 'Işjeň', notes: 'Mobil prototip boýunça iş dowam edýär.'},
  {id: 'M-205', name: 'Jennet K.', email: 'jennet@example.com', phone: '+993 63 56 78 90', orders: 1, total: '4 800 TMT', status: 'Dynçda', notes: 'Landing page tamamlandy.'},
];

function loadStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function statusVariant(status: OrderStatus | ClientStatus) {
  if (status === 'Taýýar' || status === 'Işjeň') return 'success' as const;
  if (status === 'Işlenýär' || status === 'Täze') return 'info' as const;
  return 'warning' as const;
}

function PageHeader({title, description, action}: {title: string; description: string; action?: React.ReactNode}) {
  return <HStack justify="between" align="center" gap={4} wrap="wrap"><VStack gap={1}><Heading level={1} type="display-2">{title}</Heading><Text color="secondary">{description}</Text></VStack>{action}</HStack>;
}

function StatCard({label, value, note, badge}: {label: string; value: string; note: string; badge: string}) {
  return <Card padding={5}><VStack gap={4}><HStack justify="between"><Text type="supporting" color="secondary">{label}</Text><Badge variant="success" label={badge} /></HStack><Heading level={2} type="display-3">{value}</Heading><Text type="supporting" color="secondary">{note}</Text></VStack></Card>;
}

export default function App() {
  const toast = useToast();
  const [page, setPage] = useState<PageKey>('dashboard');
  const [mode, setMode] = useState<'light' | 'dark'>(() => loadStored('nexa-mode', 'light'));
  const [compact, setCompact] = useState(() => loadStored('nexa-compact', false));
  const [orders, setOrders] = useState<Order[]>(() => loadStored('nexa-orders', initialOrders));
  const [clients, setClients] = useState<Client[]>(() => loadStored('nexa-clients', initialClients));
  const [activities, setActivities] = useState<Activity[]>(() => loadStored('nexa-activity', [
    {id: 'A-1', text: 'Nexa A UI interaktiw demo täzelendi.', time: 'Häzir', kind: 'success'},
    {id: 'A-2', text: 'S-1048 sargydy tamamlanan hökmünde bellendi.', time: '20 minut öň', kind: 'info'},
  ]));
  const [notifications, setNotifications] = useState<Notification[]>([
    {id: 'N-1', title: 'Täze sargyt', description: 'Selbi B. täze admin panel sargydyny iberdi.', unread: true},
    {id: 'N-2', title: 'Taslama tamamlandy', description: 'Aýlar H. üçin web dizaýn taýýar.', unread: true},
    {id: 'N-3', title: 'Ulgam ýagdaýy', description: 'GitHub Pages deploy kadaly tamamlandy.', unread: false},
  ]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [deleteClient, setDeleteClient] = useState<Client | null>(null);
  const [orderForm, setOrderForm] = useState({client: '', service: '', price: ''});
  const [clientForm, setClientForm] = useState({name: '', email: '', phone: ''});

  useEffect(() => localStorage.setItem('nexa-orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('nexa-clients', JSON.stringify(clients)), [clients]);
  useEffect(() => localStorage.setItem('nexa-activity', JSON.stringify(activities)), [activities]);
  useEffect(() => localStorage.setItem('nexa-mode', JSON.stringify(mode)), [mode]);
  useEffect(() => localStorage.setItem('nexa-compact', JSON.stringify(compact)), [compact]);

  const logActivity = (text: string, kind: Activity['kind'] = 'info') => {
    setActivities((current) => [{id: `A-${Date.now()}`, text, time: 'Häzir', kind}, ...current].slice(0, 30));
  };

  const addOrder = () => {
    if (!orderForm.client.trim() || !orderForm.service.trim() || !orderForm.price.trim()) {
      toast({body: 'Ähli hökmany meýdanlary dolduryň.', type: 'error'});
      return;
    }
    const item: Order = {
