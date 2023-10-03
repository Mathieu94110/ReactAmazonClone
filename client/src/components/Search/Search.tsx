import { useState, useEffect } from "react";
import SearchInput from "./Components/SearchInput";
import { useDebounce } from "../../hooks/useDebounce";
import { getProductsList } from "../../apis/product";

export const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  // DebouncedOutput is initialized to null in order to prevent searchInputValue from parent to be empty after first loading
  const [debouncedOutput, setDebouncedOutput] = useState<string | null>(null);

  const onChangeDebouncedEvent = (text: string): void => {
    setDebouncedOutput(text.trim().toLowerCase());
  };
  // Here onChangeDebounced is used to authorize api call after 800ms delay between each new entries
  const onChangeDebounced = useDebounce(onChangeDebouncedEvent);

  async function searchQueries(query: string): Promise<void> {
    const products = await getProductsList();
    setProducts(products.filter((p) => p.name.toLowerCase().includes(query)));
  }

  useEffect(() => {
    if (debouncedOutput) searchQueries(debouncedOutput);
  }, [debouncedOutput]);

  return (
    <SearchInput
      handleSearch={onChangeDebounced}
      query={query}
      setQuery={setQuery}
      products={products}
    />
  );
};
