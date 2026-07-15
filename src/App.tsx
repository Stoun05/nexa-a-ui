import {useMemo, useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Icon} from '@astryxdesign/core/Icon';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {NavIcon} from '@astryxdesign/core/NavIcon';
import {Pagination} from '@astryxdesign/core/Pagination';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Section} from '@astryxdesign/core/Section';
import {
  SegmentedControl,
  SegmentedControlItem,
} from '@astryxdesign/core/SegmentedControl';
import {
  SideNav,
  SideNavHeading,
  SideNavItem,
  SideNavSection,
} from '@astryxdesign/core/SideNav';
import {Switch} from '@astryxdesign/core/Switch';
import {Table, pixel, proportional, type TableColumn} from '@astryxdesign/core/Table';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TopNav, TopNavHeading} from '@astryxdesign/core/TopNav';
import {VStack} from '@astryxdesign/core/VStack';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

type PageKey = 'dashboard' | 'orders' | 'catalog' | 'clients' | 'settings';
type ThemeMode = 'light' | 'dark';

interface OrderRow extends Record<string, unknown> {
  id: string;
  client: string;
  service: string;
  status: 'Taýýar' | 'Işlenýär' | 'Garaşylýar';
  price: string;
  date: string;
}

const orders: OrderRow[] = [
  {id: 'S-1048', client: 'Aýlar H.', service: 'Web dizaýn', status: 'Taýýar', price: '8 400 TMT', date: '15.07.2026'},
  {id: 'S-1047', client: 'Merdan A.', service: 'Katalog ulgamy', status: 'Işlenýär', price: '12 600 TMT', date: '14.07.2026'},
  {id: 'S-1046', client: 'Selbi B.', service: 'Admin panel', status: 'Garaşylýar', price: '6 200 TMT', date: '13.07.2026'},
  {id: 'S-1045', client: 'Arslan D.', service: 'Mobil prototip', status: 'Işlenýär', price: '9 900 TMT', date: '12.07.2026'},
  {id: 'S-1044', client: 'Jennet K.', service: 'Landing page', status: 'Taýýar', price: '4 800 TMT', date: '11.07.2026'},
  {id: 'S-1043', client: 'Begenç S.', service: 'CRM görnüşi', status: 'Garaşylýar', price: '15 300 TMT', date: '10.07.2026'},
];

function statusVariant(status: OrderRow['status']) {
  if (status === 'Taýýar') return 'success' as const;
  if (status === 'Işlenýär') return 'info' as const;
  return 'warning' as const;
}

function StatCard({label, value, note, badge}: {label: string; value: string; note: string; badge: string}) {
  return (
    <Card padding={5} minHeight={150}>
      <VStack gap={4}>
        <HStack justify="between" align="center" gap={3}>
          <Text type="supporting" color="secondary">{label}</Text>
          <Badge variant="success" label={badge} />
        </HStack>
        <Heading level={2} type="display-3">{value}</Heading>
        <Text type="supporting" color="secondary">{note}</Text>
      </VStack>
    </Card>
  );
}

function PageHeader({title, description, action}: {title: string; description: string; action?: React.ReactNode}) {
  return (
    <HStack justify="between" align="center" gap={4} wrap="wrap">
      <VStack gap={1}>
        <Heading level={1} type="display-2">{title}</Heading>
        <Text color="secondary">{description}</Text>
      </VStack>
      {action}
    </HStack>
  );
}

function DashboardPage() {
  const [period, setPeriod] = useState('hepde');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('tr');
    if (!normalized) return orders;
    return orders.filter((order) =>
      [order.id, order.client, order.service, order.status]
        .join(' ')
        .toLocaleLowerCase('tr')
        .includes(normalized),
    );
  }, [query]);

  const columns: TableColumn<OrderRow>[] = [
    {key: 'id', header: 'Belgisi', width: pixel(100)},
    {key: 'client', header: 'Müşderi', width: proportional(1)},
    {key: 'service', header: 'Hyzmat', width: proportional(1)},
    {
      key: 'status',
      header: 'Ýagdaý',
      width: pixel(120),
      renderCell: (row) => <Badge variant={statusVariant(row.status)} label={row.status} />,
    },
    {key: 'price', header: 'Bahasy', width: pixel(120)},
    {key: 'date', header: 'Sene', width: pixel(120)},
  ];

  return (
    <VStack gap={6}>
      <Banner
        status="info"
        title="Nexa A UI diňe Astryx komponentleri bilen guruldy"
        description="Daşarky UI kit, taýýar dashboard şablony ýa-da custom komponent stili ulanylmady."
        isDismissable
      />

      <PageHeader
        title="Dolandyryş paneli"
        description="Işleriň, sargytlaryň we müşderileriň häzirki ýagdaýy."
        action={<Button label="Täze sargyt" variant="primary" icon={<Icon icon="check" />} />}
      />

      <SegmentedControl value={period} onChange={setPeriod} label="Hasabat döwri" size="md">
        <SegmentedControlItem value="gun" label="Şu gün" />
        <SegmentedControlItem value="hepde" label="Şu hepde" />
        <SegmentedControlItem value="ay" label="Şu aý" />
      </SegmentedControl>

      <Grid columns={{minWidth: 220, repeat: 'fit'}} gap={4}>
        <StatCard label="Jemi girdeji" value="48 720 TMT" note={`${period} boýunça hasabat`} badge="+12%" />
        <StatCard label="Täze sargytlar" value="24" note="Öňki döwürden 4 sany köp" badge="+20%" />
        <StatCard label="Işjeň müşderiler" value="186" note="Soňky 30 günde" badge="+8%" />
        <StatCard label="Tamamlanan işler" value="91%" note="Wagtynda tabşyrylan" badge="+5%" />
      </Grid>

      <Grid columns={{minWidth: 310, repeat: 'fit'}} gap={4}>
        <Card padding={5}>
          <VStack gap={5}>
            <HStack justify="between" align="center">
              <VStack gap={1}>
                <Heading level={2} type="display-3">Taslamalaryň ösüşi</Heading>
                <Text type="supporting" color="secondary">Häzirki möhüm işleriň ýagdaýy</Text>
              </VStack>
              <Badge variant="info" label="4 işjeň" />
            </HStack>
            <VStack gap={4}>
              <ProgressBar label="Atçylyk portaly" value={82} hasValueLabel variant="success" />
              <ProgressBar label="Aýbölek katalogy" value={64} hasValueLabel variant="accent" />
              <ProgressBar label="Deniz Taxi paneli" value={41} hasValueLabel variant="warning" />
              <ProgressBar label="TypeOrbit synagy" value={27} hasValueLabel variant="neutral" />
            </VStack>
          </VStack>
        </Card>

        <Card padding={5}>
          <VStack gap={5}>
            <HStack justify="between" align="center">
              <VStack gap={1}>
                <Heading level={2} type="display-3">Ulgam ýagdaýy</Heading>
                <Text type="supporting" color="secondary">Nexa A UI ulgam gözegçiligi</Text>
              </VStack>
              <Badge variant="success" label="Kadaly" />
            </HStack>
            <MetadataList columns="single">
              <MetadataListItem label="UI ulgamy">Astryx Core 0.1.5</MetadataListItem>
              <MetadataListItem label="Tema">Neutral</MetadataListItem>
              <MetadataListItem label="Režim">Responsive AppShell</MetadataListItem>
              <MetadataListItem label="Dil">Türkmençe</MetadataListItem>
              <MetadataListItem label="Custom CSS">Ulanylmady</MetadataListItem>
            </MetadataList>
          </VStack>
        </Card>
      </Grid>

      <Card padding={0}>
        <Section padding={5} dividers={['bottom']}>
          <HStack justify="between" align="center" gap={4} wrap="wrap">
            <VStack gap={1}>
              <Heading level={2} type="display-3">Soňky sargytlar</Heading>
              <Text type="supporting" color="secondary">Sargytlaryň ýagdaýyny bir ýerden görüň.</Text>
            </VStack>
            <TextInput
              label="Sargyt gözlegi"
              isLabelHidden
              value={query}
              onChange={setQuery}
              placeholder="Belgi, müşderi ýa-da hyzmat..."
              hasClear
              startIcon={<Icon icon="search" />}
              width={300}
            />
          </HStack>
        </Section>
        {filteredOrders.length > 0 ? (
          <>
            <Table<OrderRow>
              data={filteredOrders}
              columns={columns}
              idKey="id"
              density="balanced"
              dividers="rows"
              hasHover
              textOverflow="truncate"
            />
            <Section padding={4} dividers={['top']}>
              <Pagination page={page} onChange={setPage} totalItems={48} pageSize={10} label="Sargyt sahypalary" />
            </Section>
          </>
        ) : (
          <Section padding={8}>
            <EmptyState
              title="Sargyt tapylmady"
              description="Gözleg sözüni üýtgedip täzeden synanyşyň."
              icon={<Icon icon="search" size="lg" color="secondary" />}
              actions={<Button label="Gözlegi arassala" variant="secondary" onClick={() => setQuery('')} />}
            />
          </Section>
        )}
      </Card>
    </VStack>
  );
}

function OrdersPage() {
  const columns: TableColumn<OrderRow>[] = [
    {key: 'id', header: 'Sargyt', width: pixel(100)},
    {key: 'client', header: 'Müşderi', width: proportional(1)},
    {key: 'service', header: 'Hyzmat', width: proportional(1)},
    {key: 'status', header: 'Ýagdaý', width: pixel(120), renderCell: (row) => <Badge variant={statusVariant(row.status)} label={row.status} />},
    {key: 'price', header: 'Bahasy', width: pixel(120)},
    {key: 'date', header: 'Sene', width: pixel(120)},
  ];

  return (
    <VStack gap={6}>
      <PageHeader
        title="Sargytlar"
        description="Ähli sargytlaryň doly sanawy we häzirki ýagdaýy."
        action={<Button label="Sargyt goş" variant="primary" />}
      />
      <Card padding={0}>
        <Table<OrderRow> data={orders} columns={columns} idKey="id" density="spacious" dividers="grid" isStriped hasHover />
      </Card>
    </VStack>
  );
}

function CatalogPage() {
  const products = [
    {name: 'Admin panel', type: 'Web programma', status: 'Taýýar', progress: 100},
    {name: 'Katalog ulgamy', type: 'E-commerce', status: 'Täzelenýär', progress: 72},
    {name: 'AI chat görnüşi', type: 'AI interfeýs', status: 'Synagda', progress: 54},
    {name: 'Hasabat merkezi', type: 'Dashboard', status: 'Meýilleşdirilýär', progress: 22},
  ];

  return (
    <VStack gap={6}>
      <PageHeader
        title="Hyzmat katalogy"
        description="Nexa A UI hyzmatlarynyň dolandyryş katalogy."
        action={<Button label="Hyzmat goş" variant="primary" />}
      />
      <Grid columns={{minWidth: 260, repeat: 'fit'}} gap={4}>
        {products.map((product, index) => (
          <Card key={product.name} padding={5} variant={index === 0 ? 'blue' : 'default'}>
            <VStack gap={5}>
              <HStack justify="between" align="center" gap={3}>
                <Badge variant={index === 0 ? 'info' : 'neutral'} label={product.type} />
                <Icon icon="moreHorizontal" color="secondary" />
              </HStack>
              <VStack gap={2}>
                <Heading level={2} type="display-3">{product.name}</Heading>
                <Text color="secondary">Arassa, responsive we dolandyryşa taýýar interfeýs.</Text>
              </VStack>
              <ProgressBar label={product.status} value={product.progress} hasValueLabel variant={product.progress === 100 ? 'success' : 'accent'} />
              <Divider />
              <HStack justify="between" align="center">
                <Text type="supporting" color="secondary">Başlangyç görnüş</Text>
                <Button label="Giňişleýin" variant="ghost" size="sm" endContent={<Icon icon="chevronRight" />} />
              </HStack>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}

function ClientsPage() {
  return (
    <VStack gap={6}>
      <PageHeader
        title="Müşderiler"
        description="Müşderi maglumatlaryny dolandyrmak üçin taýýarlanan bölüm."
        action={<Button label="Müşderi goş" variant="primary" />}
      />
      <Card padding={8} minHeight={420}>
        <EmptyState
          title="Täze müşderiler üçin ýer taýýar"
          description="Bu demo maglumat bazasyna birikdirilmedi. Şonuň üçin müşderi kartlary häzir görkezilmeýär."
          icon={<Icon icon="info" size="lg" color="accent" />}
          actions={
            <HStack gap={2}>
              <Button label="Ilkinji müşderini goş" variant="primary" />
              <Button label="Maglumat import et" variant="secondary" />
            </HStack>
          }
        />
      </Card>
    </VStack>
  );
}

function SettingsPage({darkMode, onDarkModeChange}: {darkMode: boolean; onDarkModeChange: (value: boolean) => void}) {
  const [notifications, setNotifications] = useState(true);
  const [compact, setCompact] = useState(false);
  const [language, setLanguage] = useState('tm');

  return (
    <VStack gap={6}>
      <PageHeader title="Sazlamalar" description="Nexa A UI interfeýsiniň esasy sazlamalary." />
      <Grid columns={{minWidth: 320, repeat: 'fit'}} gap={4}>
        <Card padding={5}>
          <VStack gap={5}>
            <VStack gap={1}>
              <Heading level={2} type="display-3">Görnüş</Heading>
              <Text type="supporting" color="secondary">Tema we interfeýs sazlamalary</Text>
            </VStack>
            <Divider />
            <Switch
              label="Garaňky režim"
              description="Astryx Neutral temasynyň garaňky görnüşini açýar."
              value={darkMode}
              onChange={onDarkModeChange}
              labelSpacing="spread"
              width="100%"
            />
            <Switch
              label="Ykjam görnüş"
              description="Maglumatlary has dykyz görkezmek üçin."
              value={compact}
              onChange={setCompact}
              labelSpacing="spread"
              width="100%"
            />
          </VStack>
        </Card>

        <Card padding={5}>
          <VStack gap={5}>
            <VStack gap={1}>
              <Heading level={2} type="display-3">Habarnamalar</Heading>
              <Text type="supporting" color="secondary">Ulgam habarlaryny dolandyrmak</Text>
            </VStack>
            <Divider />
            <Switch
              label="Täze sargyt habary"
              description="Täze sargyt gelende interfeýsde habar görkeziler."
              value={notifications}
              onChange={setNotifications}
              labelSpacing="spread"
              width="100%"
            />
            <ProgressBar label="Sazlamalaryň taýýarlygy" value={86} hasValueLabel variant="success" />
          </VStack>
        </Card>
      </Grid>

      <Card padding={5}>
        <VStack gap={5}>
          <VStack gap={1}>
            <Heading level={2} type="display-3">Dil</Heading>
            <Text type="supporting" color="secondary">Nexa A UI üçin interfeýs dili</Text>
          </VStack>
          <SegmentedControl value={language} onChange={setLanguage} label="Interfeýs dili" layout="fill">
            <SegmentedControlItem value="tm" label="Türkmençe" />
            <SegmentedControlItem value="ru" label="Rusça" />
            <SegmentedControlItem value="en" label="Iňlisçe" />
          </SegmentedControl>
          <Banner status="success" title="Sazlamalar ýerli ýagdaýda işleýär" description="Backend birikmesi bu ilkinji Astryx bilen gurlan görnüşine girizilmedi." />
        </VStack>
      </Card>
    </VStack>
  );
}

export default function App() {
  const [page, setPage] = useState<PageKey>('dashboard');
  const [mode, setMode] = useState<ThemeMode>('light');

  const navigation = (
    <SideNav
      header={
        <SideNavHeading
          icon={<NavIcon icon={<Icon icon="wrench" size="sm" />} />}
          heading="Nexa A UI"
          subheading="Diňe resmi komponentler"
        />
      }
      topContent={<Button label="Täze taslama" variant="primary" size="md" />}
      collapsible={{defaultIsCollapsed: false, buttonLabel: 'Menýuny ýygnamak'}}
      footer={<Text type="supporting" color="secondary">v0.1.5 · Neutral theme</Text>}
    >
      <SideNavSection title="Esasy">
        <SideNavItem label="Baş panel" icon={<Icon icon="viewColumns" />} isSelected={page === 'dashboard'} onClick={() => setPage('dashboard')} />
        <SideNavItem label="Sargytlar" icon={<Icon icon="checkDouble" />} isSelected={page === 'orders'} onClick={() => setPage('orders')} endContent={<Badge variant="info" label="6" />} />
        <SideNavItem label="Katalog" icon={<Icon icon="funnel" />} isSelected={page === 'catalog'} onClick={() => setPage('catalog')} />
        <SideNavItem label="Müşderiler" icon={<Icon icon="info" />} isSelected={page === 'clients'} onClick={() => setPage('clients')} />
      </SideNavSection>
      <SideNavSection title="Ulgam">
        <SideNavItem label="Sazlamalar" icon={<Icon icon="wrench" />} isSelected={page === 'settings'} onClick={() => setPage('settings')} />
      </SideNavSection>
    </SideNav>
  );

  const topNavigation = (
    <TopNav
      label="Esasy nawigasiýa"
      heading={
        <TopNavHeading
          logo={<NavIcon icon={<Icon icon="wrench" size="sm" />} />}
          logoLabel="Nexa A UI"
          heading="Nexa A UI Dolandyryş Merkezi"
        />
      }
      endContent={
        <HStack gap={3} align="center">
          <Badge variant="success" label="Astryx bilen gurlan" />
          <Button
            label={mode === 'dark' ? 'Ýagty görnüş' : 'Garaňky görnüş'}
            variant="ghost"
            size="sm"
            icon={<Icon icon={mode === 'dark' ? 'eyeSlash' : 'viewColumns'} />}
            onClick={() => setMode((current) => (current === 'dark' ? 'light' : 'dark'))}
          />
        </HStack>
      }
    />
  );

  let content: React.ReactNode;
  if (page === 'orders') content = <OrdersPage />;
  else if (page === 'catalog') content = <CatalogPage />;
  else if (page === 'clients') content = <ClientsPage />;
  else if (page === 'settings') content = <SettingsPage darkMode={mode === 'dark'} onDarkModeChange={(value) => setMode(value ? 'dark' : 'light')} />;
  else content = <DashboardPage />;

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <AppShell
        topNav={topNavigation}
        sideNav={navigation}
        mobileNav={{breakpoint: 'md'}}
        variant="elevated"
        height="auto"
        contentPadding={0}
      >
        <Section padding={6} variant="transparent">
          {content}
        </Section>
      </AppShell>
    </Theme>
  );
}
