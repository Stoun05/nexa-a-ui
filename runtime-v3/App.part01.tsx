      id: `S-${1049 + orders.length}`,
      client: orderForm.client.trim(),
      service: orderForm.service.trim(),
      price: orderForm.price.includes('TMT') ? orderForm.price : `${orderForm.price} TMT`,
      status: 'Garaşylýar',
      date: new Date().toLocaleDateString('tk-TM'),
      description: 'Täze goşulan demo sargyt.',
    };
    setOrders((current) => [item, ...current]);
    setOrderForm({client: '', service: '', price: ''});
    setOrderDialogOpen(false);
    logActivity(`${item.id} belgili täze sargyt goşuldy.`, 'success');
    toast({body: 'Täze sargyt üstünlikli goşuldy.'});
  };

  const addClient = () => {
    if (!clientForm.name.trim() || !clientForm.email.includes('@')) {
      toast({body: 'Ady we dogry e-poçta salgysyny giriziň.', type: 'error'});
      return;
    }
    const item: Client = {
      id: `M-${206 + clients.length}`,
      name: clientForm.name.trim(),
      email: clientForm.email.trim(),
      phone: clientForm.phone.trim() || 'Görkezilmedi',
      orders: 0,
      total: '0 TMT',
      status: 'Täze',
      notes: 'Täze goşulan müşderi.',
    };
    setClients((current) => [item, ...current]);
    setClientForm({name: '', email: '', phone: ''});
    setClientDialogOpen(false);
    logActivity(`${item.name} müşderiler sanawyna goşuldy.`, 'success');
    toast({body: 'Müşderi üstünlikli goşuldy.'});
  };

  const removeClient = () => {
    if (!deleteClient) return;
    setClients((current) => current.filter((item) => item.id !== deleteClient.id));
    logActivity(`${deleteClient.name} müşderiler sanawyndan pozuldy.`, 'warning');
    toast({body: 'Müşderi sanawdan pozuldy.'});
    setDeleteClient(null);
  };

  const commands: SearchableItem<{page: PageKey}>[] = [
    {id: 'dashboard', label: 'Baş paneli aç', auxiliaryData: {page: 'dashboard'}},
    {id: 'orders', label: 'Sargytlary aç', auxiliaryData: {page: 'orders'}},
    {id: 'clients', label: 'Müşderileri aç', auxiliaryData: {page: 'clients'}},
    {id: 'reports', label: 'Hasabatlary aç', auxiliaryData: {page: 'reports'}},
    {id: 'activity', label: 'Iş taryhyny aç', auxiliaryData: {page: 'activity'}},
    {id: 'settings', label: 'Sazlamalary aç', auxiliaryData: {page: 'settings'}},
    ...orders.slice(0, 6).map((item) => ({id: `order-${item.id}`, label: `${item.id} · ${item.client} · ${item.service}`, auxiliaryData: {page: 'orders' as PageKey}})),
    ...clients.slice(0, 6).map((item) => ({id: `client-${item.id}`, label: `${item.name} · ${item.email}`, auxiliaryData: {page: 'clients' as PageKey}})),
  ];
  const commandSource = createStaticSource(commands);

  const navigation = <SideNav header={<SideNavHeading icon={<NavIcon icon={<Icon icon="wrench" size="sm" />} />} heading="Nexa A UI" subheading="Astryx admin demo" />} topContent={<Button label="Täze sargyt" variant="primary" onClick={() => setOrderDialogOpen(true)} />} collapsible={{defaultIsCollapsed: false, buttonLabel: 'Menýuny ýygnamak'}} footer={<Text type="supporting" color="secondary">v0.2.0 · Astryx</Text>}>
    <SideNavSection title="Esasy">
      <SideNavItem label="Baş panel" icon={<Icon icon="viewColumns" />} isSelected={page === 'dashboard'} onClick={() => setPage('dashboard')} />
      <SideNavItem label="Sargytlar" icon={<Icon icon="checkDouble" />} isSelected={page === 'orders'} onClick={() => setPage('orders')} endContent={<Badge variant="info" label={String(orders.length)} />} />
      <SideNavItem label="Müşderiler" icon={<Icon icon="info" />} isSelected={page === 'clients'} onClick={() => setPage('clients')} />
      <SideNavItem label="Hasabatlar" icon={<Icon icon="viewColumns" />} isSelected={page === 'reports'} onClick={() => setPage('reports')} />
      <SideNavItem label="Iş taryhy" icon={<Icon icon="checkDouble" />} isSelected={page === 'activity'} onClick={() => setPage('activity')} />
    </SideNavSection>
    <SideNavSection title="Ulgam"><SideNavItem label="Sazlamalar" icon={<Icon icon="wrench" />} isSelected={page === 'settings'} onClick={() => setPage('settings')} /></SideNavSection>
  </SideNav>;

  const topNav = <TopNav label="Esasy nawigasiýa" heading={<TopNavHeading logo={<NavIcon icon={<Icon icon="wrench" size="sm" />} />} logoLabel="Nexa A UI" heading="Nexa A UI Dolandyryş Merkezi" />} endContent={<HStack gap={2} align="center"><Button label="Global gözleg" size="sm" variant="secondary" icon={<Icon icon="search" />} onClick={() => setPaletteOpen(true)} /><Button label={`Habarnamalar (${notifications.filter((item) => item.unread).length})`} size="sm" variant="secondary" onClick={() => setNotificationOpen(true)} /><Button label={mode === 'dark' ? 'Ýagty' : 'Garaňky'} size="sm" variant="ghost" onClick={() => setMode((value) => value === 'dark' ? 'light' : 'dark')} /></HStack>} />;

  let content: React.ReactNode;
  if (page === 'orders') content = <OrdersPage orders={orders} compact={compact} onNew={() => setOrderDialogOpen(true)} onOpen={setSelectedOrder} onStatus={(order, status) => {setOrders((current) => current.map((item) => item.id === order.id ? {...item, status} : item)); logActivity(`${order.id} ýagdaýy “${status}” edildi.`, 'info'); toast({body: 'Sargyt ýagdaýy täzelendi.'});}} />;
  else if (page === 'clients') content = <ClientsPage clients={clients} compact={compact} onNew={() => setClientDialogOpen(true)} onOpen={setSelectedClient} onDelete={setDeleteClient} />;
  else if (page === 'reports') content = <ReportsPage orders={orders} clients={clients} />;
  else if (page === 'activity') content = <ActivityPage activities={activities} />;
  else if (page === 'settings') content = <SettingsPage compact={compact} setCompact={setCompact} mode={mode} setMode={setMode} onReset={() => {localStorage.clear(); toast({body: 'Ýerli demo maglumatlary arassalandy.'});}} />;
  else content = <DashboardPage orders={orders} clients={clients} onNew={() => setOrderDialogOpen(true)} onOpenOrder={setSelectedOrder} />;

  return <Theme theme={neutralTheme} mode={mode}>
    <AppShell topNav={topNav} sideNav={navigation} mobileNav={{breakpoint: 'md'}} variant="elevated" height="auto" contentPadding={0}><Section padding={6} variant="transparent">{content}</Section></AppShell>

    <CommandPalette isOpen={paletteOpen} onOpenChange={setPaletteOpen} searchSource={commandSource} value="" onValueChange={(id) => {const command = commands.find((item) => item.id === id); if (command?.auxiliaryData) setPage(command.auxiliaryData.page); setPaletteOpen(false);}} label="Nexa A UI global gözlegi" />

    <Dialog isOpen={notificationOpen} onOpenChange={setNotificationOpen} width={520}><Layout header={<DialogHeader title="Habarnamalar merkezi" onOpenChange={setNotificationOpen} />} content={<LayoutContent><VStack gap={3}>{notifications.map((item) => <Card key={item.id} padding={4} variant={item.unread ? 'blue' : 'default'}><HStack justify="between" gap={3}><VStack gap={1}><Text weight="bold">{item.title}</Text><Text type="supporting" color="secondary">{item.description}</Text></VStack>{item.unread && <Badge variant="info" label="Täze" />}</HStack></Card>)}</VStack></LayoutContent>} footer={<LayoutFooter hasDivider><HStack justify="end"><Button label="Hemmesini okalan et" variant="secondary" onClick={() => {setNotifications((current) => current.map((item) => ({...item, unread: false}))); toast({body: 'Habarnamalar okalan edildi.'});}} /></HStack></LayoutFooter>} /></Dialog>

    <Dialog isOpen={orderDialogOpen} onOpenChange={setOrderDialogOpen} purpose="form" width={520}><Layout header={<DialogHeader title="Täze sargyt goş" onOpenChange={setOrderDialogOpen} />} content={<LayoutContent><FormLayout><TextInput label="Müşderi" value={orderForm.client} onChange={(value) => setOrderForm((current) => ({...current, client: value}))} width="100%" isRequired /><TextInput label="Hyzmat" value={orderForm.service} onChange={(value) => setOrderForm((current) => ({...current, service: value}))} width="100%" isRequired /><TextInput label="Bahasy" value={orderForm.price} onChange={(value) => setOrderForm((current) => ({...current, price: value}))} width="100%" placeholder="8 500 TMT" isRequired /></FormLayout></LayoutContent>} footer={<LayoutFooter hasDivider><HStack justify="end" gap={2}><Button label="Ýatyr" variant="ghost" onClick={() => setOrderDialogOpen(false)} /><Button label="Sargydy goş" variant="primary" onClick={addOrder} /></HStack></LayoutFooter>} /></Dialog>

    <Dialog isOpen={clientDialogOpen} onOpenChange={setClientDialogOpen} purpose="form" width={520}><Layout header={<DialogHeader title="Täze müşderi goş" onOpenChange={setClientDialogOpen} />} content={<LayoutContent><FormLayout><TextInput label="Ady" value={clientForm.name} onChange={(value) => setClientForm((current) => ({...current, name: value}))} width="100%" isRequired /><TextInput label="E-poçta" type="email" value={clientForm.email} onChange={(value) => setClientForm((current) => ({...current, email: value}))} width="100%" isRequired /><TextInput label="Telefon" value={clientForm.phone} onChange={(value) => setClientForm((current) => ({...current, phone: value}))} width="100%" /></FormLayout></LayoutContent>} footer={<LayoutFooter hasDivider><HStack justify="end" gap={2}><Button label="Ýatyr" variant="ghost" onClick={() => setClientDialogOpen(false)} /><Button label="Müşderini goş" variant="primary" onClick={addClient} /></HStack></LayoutFooter>} /></Dialog>

