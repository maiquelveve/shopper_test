import { Box, CardContent } from "@mui/material";

import { CardComponent, Page } from "../../../components";
import { TableProducts } from "./components";

export const Dashboard = () => {
  return (
    <Page>
      <Page title="Carregar Arquivo">
        <CardComponent>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <TableProducts dataFile={dataFileMock} />
            </Box>
          </CardContent>
        </CardComponent>
      </Page>
    </Page>
  );
};


const dataFileMock: IReturnedRequestFileResultApi[] = [
  {
    isError: true,
    error: ["Maior que 10%", "valor do custo menor que o novo preço"],
    data: {
      code: 16,
      name: "Bebida lactea",
      sales_price: 5.56,
      new_price: 5.60
    }
  },
  {
    isError: false,
    error: [""],
    data: {
      code: 21,
      name: "Bebida energetica",
      sales_price: 15.56,
      new_price: 15.60
    }
  },
  {
    isError: true,
    error: ["Menor que 10%"],
    data: {
      code: 17,
      name: "Bolacha",
      sales_price: 2.56,
      new_price: 2.60
    }
  },
  {
    isError: true,
    error: ["Maior que 10%", "valor do custo menor que o novo preço", "Não contem os itens do pacote"],
    data: {
      code: 18,
      name: "Kit de Bebida lactea com6 unidades",
      sales_price: 35.56,
      new_price: 35.60
    }
  },
];
