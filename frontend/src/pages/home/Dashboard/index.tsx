import { Box, CardContent, Paper, Typography } from "@mui/material";

import { CardComponent, LoadingText, Page, UploadFile } from "../../../components";
import { TableProducts } from "./components";
import { useCallback, useState } from "react";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dataFile, setDataFile] = useState<IReturnedRequestFileResultApi[]>([]);

  const handleValidateFile = useCallback(async ({ file }: { file: File}) => {
    setLoading(true);
    console.log(file);
    setDataFile(dataFileMock);
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <Page>
      <Page title="Carregar Arquivo">
        <CardComponent>
          <CardContent>
            <Box 
              display="flex" 
              alignItems="center" 
              flexDirection="row" 
              component={Paper}
              elevation={20}
              mb={5}
              p={1}
              height={100}
              sx={{ borderRadius: 3}}
            >
              <UploadFile handleValidateFile={handleValidateFile} />
            </Box>
            
            <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height={120}>
                  <LoadingText />
                </Box>
              ) :
                dataFile.length ?
                  <TableProducts dataFile={dataFile} />
                  :
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height={80}>
                    <Typography variant="overline">Selecione um arquivo CSV</Typography>
                  </Box>
              }
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
