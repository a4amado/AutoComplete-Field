
import{ Circular, Node } from 'doublie';



const AutoComplete = () => {
  const toast = useToast()
  const [show, {on, off}] = useBoolean()
  const [q, setQ] = React.useState("");
  const onChange = (e) => {
    
    
    
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      return e.preventDefault()
    }

    const Coee = isArabic.validate({ word: e.target.value })
    if (!Coee) return toast({
      title: t("ONLY_AR_LETTERS"),
      status:"error",
      isClosable: true
    })
    setQ(e.target.value);
    search(e.target.value);
  };
  const inputRefContainer = React.useRef<HTMLElement>();
  const inputRef = React.useRef<HTMLElement>();
  const [searching, setSearching] = useState<boolean>();
  const [items, setItems] = useState<Circular>();
  const [activeItem, setActiveItem] = useState<Node>();

  const { t } = useTranslation("common");
  
  function search(e) {
    setItems(null);
    setActiveItem(null);
    setSearching(true);
    console.log(e);

    setTimeout(() => {
      const circular = new Circular();
      
      
      Array.from({ length: 10 }, () => ({ id: Math.random() * 10 })).map((e) =>
        circular.append(e)
      );

      setItems(circular)
    
      
      setSearching(false);
    }, 2000);
  }

  function SwitchNode(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (!items) return false;
      if (!activeItem) return setActiveItem(items.head);
      setActiveItem(activeItem.next);
      return false;
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!items) return false;
      if (!activeItem) return setActiveItem(items.last);
      setActiveItem(activeItem.prev);
      return false;
    }
    return true;
  };

  return (
    <>
    <Portal>
    {
            show && <Box onClick={off} position="absolute" top={0} left={0} h="100%" width="100%" bg="blackAlpha.400" zIndex={1}/>
          }
    </Portal>
      <Box position="relative" height="auto" maxW={700} w="100%" margin="0 auto" zIndex={2}>
        <InputGroup
          ref={inputRefContainer}
          height={65}
          tabIndex={0}
          borderRadius={0}
          position=""
          maxW="700px"
          overflow="hidden"
          
        >
          <Input
             dir="rtl"
            bg="white"
            pr="4.5rem"
            textAlign="center"
            height="100%"
            w="100%"
            borderRadius={0}
            
            onChange={onChange}
            onKeyDown={SwitchNode}
            onFocus={on}
            
            value={q}
          />
          <InputLeftAddon borderRadius={0} height="100%">
            {t("SEARCH")}
          </InputLeftAddon>
          
        <Box
          bg="white"
          position="absolute"
          top="100%"
          
          width="100%"
          left={0}
          display="grid"
          gap={1}
        >
          {!!items && !searching && !!q && show && (
            <>
            <ListOfSuggestions items={items} activeItem={activeItem} />
            
            </>
          )}
          

          {searching && !!q && (
            <Center height={200}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          )}
          {!items && !searching && !!q && (
            <Center height={400}>Nothing Found</Center>
          )}
        </Box>
        </InputGroup>

      </Box>
    </>
  );
};

const ListOfSuggestions = ({ items, activeItem }) => {
  if (!items) return false;
  return (
    <Box css={ListStyle}>
      {items.toArray().map((e, i) => {
          const active =  activeItem?.value?.id === e.id;
          return <Button key={e.id} tabIndex={0} onClick={console.log} bg={active? "yellow": "ref"}>Item - {i}</Button>
      })}
    </Box>
  );
};
