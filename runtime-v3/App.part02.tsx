    <OrderDetailDialog order={selectedOrder} onClose={() => setSelectedOrder(null)} onStatus={(status) => {if (!selectedOrder) return; setOrders((current) => current.map((item) => item.id === selectedOrder.id ? {...item, status} : item)); setSelectedOrder({...selectedOrder, status}); logActivity(`${selectedOrder.id} ýagdaýy üýtgedildi.`, 'info'); toast({body: 'Sargyt täzelendi.'});}} />
    <ClientProfileDialog client={selectedClient} orders={orders} onClose={() => setSelectedClient(null)} />
    <AlertDialog isOpen={Boolean(deleteClient)} onOpenChange={(open) => !open && setDeleteClient(null)} title="Müşderini pozmalymy?" description={`${deleteClient?.name ?? 'Bu müşderi'} sanawdan aýrylar. Bu demo hereketini soň yzyna gaýtaryp bolmaýar.`} cancelLabel="Ýatyr" actionLabel="Poz" onAction={removeClient} />
  </Theme>;
}

function DashboardPage({orders, clients, onNew, onOpenOrder}: {orders: Order[]; clients: Client[]; onNew: () => void; onOpenOrder: (order: Order) => void}) {
  const recent = orders.slice(0, 5);
  const columns: TableColumn<Order>[] = [
    {key: 'id', header: 'Belgisi', width: pixel(100)},
    {key: 'client', header: 'Müşderi', width: proportional(1)},
    {key: 'service', header: 'Hyzmat', width: proportional(1)},
    {key: 'status', header: 'Ýagdaý', width: pixel(120), renderCell: (row) => <Badge variant={statusVariant(row.status)} label={row.status} />},
    {key: 'id', header: 'Hereket', width: pixel(100), renderCell: (row) => <Button label="Aç" size="sm" variant="ghost" onClick={() => onOpenOrder(row)} />},
  ];
  return <VStack gap={6}><Banner status="success" title="Nexa A UI v0.2.0" description="Global gözleg, LocalStorage, profiller, Tabs, Dropdown Menu, habarnamalar we sene aralygy hasabaty goşuldy." isDismissable /><PageHeader title="Dolandyryş paneli" description="Sargytlaryň, müşderileriň we işleriň häzirki ýagdaýy." action={<Button label="Täze sargyt" variant="primary" onClick={onNew} />} /><Grid columns={{minWidth: 220, repeat: 'fit'}} gap={4}><StatCard label="Jemi sargyt" value={String(orders.length)} note="Ýerli maglumatlar bilen" badge="Live" /><StatCard label="Işjeň müşderi" value={String(clients.filter((item) => item.status === 'Işjeň').length)} note="Müşderi profilleri taýýar" badge="+1" /><StatCard label="Tamamlanan işler" value={String(orders.filter((item) => item.status === 'Taýýar').length)} note="Taýýar sargytlar" badge="Kadaly" /></Grid><Grid columns={{minWidth: 320, repeat: 'fit'}} gap={4}><Card padding={5}><VStack gap={4}><Heading level={2} type="display-3">Taslamalaryň ösüşi</Heading><ProgressBar label="Atçylyk portaly" value={82} hasValueLabel variant="success" /><ProgressBar label="Aýbölek katalogy" value={64} hasValueLabel variant="accent" /><ProgressBar label="Nexa A UI" value={91} hasValueLabel variant="success" /></VStack></Card><Card padding={5}><VStack gap={4}><Heading level={2} type="display-3">Täze mümkinçilikler</Heading><MetadataList columns="single"><MetadataListItem label="Global gözleg">Command Palette</MetadataListItem><MetadataListItem label="Ýatda saklamak">LocalStorage</MetadataListItem><MetadataListItem label="Profiller">Tabs + Dialog</MetadataListItem><MetadataListItem label="Hereketler">Dropdown Menu</MetadataListItem></MetadataList></VStack></Card></Grid><Card padding={0}><Section padding={5} dividers={['bottom']}><Heading level={2} type="display-3">Soňky sargytlar</Heading></Section><Table data={recent} columns={columns} idKey="id" density="balanced" dividers="rows" hasHover /></Card></VStack>;
}

function OrdersPage({orders, compact, onNew, onOpen, onStatus}: {orders: Order[]; compact: boolean; onNew: () => void; onOpen: (order: Order) => void; onStatus: (order: Order, status: OrderStatus) => void}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Hemmesi');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => orders.filter((item) => (filter === 'Hemmesi' || item.status === filter) && [item.id, item.client, item.service].join(' ').toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))), [orders, query, filter]);
  useEffect(() => setPage(1), [query, filter]);
  const shown = filtered.slice((page - 1) * 5, page * 5);
  const columns: TableColumn<Order>[] = [
    {key: 'id', header: 'Sargyt', width: pixel(100)},
    {key: 'client', header: 'Müşderi', width: proportional(1)},
    {key: 'service', header: 'Hyzmat', width: proportional(1)},
    {key: 'status', header: 'Ýagdaý', width: pixel(120), renderCell: (row) => <Badge variant={statusVariant(row.status)} label={row.status} />},
    {key: 'price', header: 'Bahasy', width: pixel(130)},
    {key: 'id', header: 'Hereket', width: pixel(130), renderCell: (row) => <DropdownMenu button={{label: 'Hereket', size: 'sm', variant: 'ghost'}} items={[{label: 'Giňişleýin aç', onClick: () => onOpen(row)}, {type: 'section', title: 'Ýagdaý', items: [{label: 'Taýýar et', onClick: () => onStatus(row, 'Taýýar')}, {label: 'Işlenýär et', onClick: () => onStatus(row, 'Işlenýär')}, {label: 'Garaşylýar et', onClick: () => onStatus(row, 'Garaşylýar')}]}]} />},
  ];
  return <VStack gap={6}><PageHeader title="Sargytlar" description="Gözleg, filter, pagination, maglumat penjiresi we Dropdown Menu." action={<Button label="Sargyt goş" variant="primary" onClick={onNew} />} /><HStack gap={3} wrap="wrap"><TextInput label="Sargyt gözlegi" isLabelHidden value={query} onChange={setQuery} placeholder="Belgi, müşderi ýa-da hyzmat..." hasClear width={320} /><SegmentedControl value={filter} onChange={setFilter} label="Status filteri"><SegmentedControlItem value="Hemmesi" label="Hemmesi" /><SegmentedControlItem value="Taýýar" label="Taýýar" /><SegmentedControlItem value="Işlenýär" label="Işlenýär" /><SegmentedControlItem value="Garaşylýar" label="Garaşylýar" /></SegmentedControl></HStack><Card padding={0}>{shown.length ? <><Table data={shown} columns={columns} idKey="id" density={compact ? 'compact' : 'balanced'} dividers="rows" hasHover /><Section padding={4} dividers={['top']}><Pagination page={page} onChange={setPage} totalItems={filtered.length} pageSize={5} label="Sargyt sahypalary" /></Section></> : <Section padding={8}><EmptyState title="Sargyt tapylmady" description="Gözleg ýa-da filter şertini üýtgediň." icon={<Icon icon="search" size="lg" />} /></Section>}</Card></VStack>;
}

function ClientsPage({clients, compact, onNew, onOpen, onDelete}: {clients: Client[]; compact: boolean; onNew: () => void; onOpen: (client: Client) => void; onDelete: (client: Client) => void}) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => clients.filter((item) => [item.name, item.email, item.phone].join(' ').toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))), [clients, query]);
  useEffect(() => setPage(1), [query]);
  const shown = filtered.slice((page - 1) * 4, page * 4);
  const columns: TableColumn<Client>[] = [
    {key: 'name', header: 'Müşderi', width: proportional(1), renderCell: (row) => <HStack gap={3} align="center"><Avatar name={row.name} size="small" /><VStack gap={0}><Text>{row.name}</Text><Text type="supporting" color="secondary">{row.email}</Text></VStack></HStack>},
    {key: 'phone', header: 'Telefon', width: pixel(160)},
    {key: 'orders', header: 'Sargyt', width: pixel(80)},
    {key: 'total', header: 'Jemi töleg', width: pixel(140)},
    {key: 'status', header: 'Ýagdaý', width: pixel(110), renderCell: (row) => <Badge variant={statusVariant(row.status)} label={row.status} />},
    {key: 'id', header: 'Hereket', width: pixel(130), renderCell: (row) => <DropdownMenu button={{label: 'Hereket', size: 'sm', variant: 'ghost'}} items={[{label: 'Profilini aç', onClick: () => onOpen(row)}, {type: 'divider'}, {label: 'Poz', onClick: () => onDelete(row)}]} />},
  ];
  return <VStack gap={6}><PageHeader title="Müşderiler" description="Aýratyn profil, Tabs, sargyt taryhy we bellikler." action={<Button label="Müşderi goş" variant="primary" onClick={onNew} />} /><TextInput label="Müşderi gözlegi" isLabelHidden value={query} onChange={setQuery} placeholder="Ady, e-poçta ýa-da telefon..." hasClear width={340} /><Card padding={0}><Table data={shown} columns={columns} idKey="id" density={compact ? 'compact' : 'balanced'} dividers="rows" hasHover /><Section padding={4} dividers={['top']}><Pagination page={page} onChange={setPage} totalItems={filtered.length} pageSize={4} label="Müşderi sahypalary" /></Section></Card></VStack>;
}

function ReportsPage({orders, clients}: {orders: Order[]; clients: Client[]}) {
  const [range, setRange] = useState<DateRange | null>({start: '2026-07-01', end: '2026-07-16'});
  const [tab, setTab] = useState('summary');
