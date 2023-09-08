import { useCallback, useState } from "react";
import { Box, CardContent, Paper, Typography, Button } from "@mui/material";
import { SaveAs } from "@mui/icons-material";

import { 
  CardComponent, 
  LoadingSimple, 
  LoadingText, 
  Page, 
  UploadFile, 
  catchDefalutAlert, 
  defaultAlert 
} from "../../../components";

import { TableProducts } from "./components";
import { apiService } from "../../../services";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dataFile, setDataFile] = useState<IReturnedRequestFileResultApi[]>([]);
  const [fileWithoutError, setFileWithoutError] = useState(false);

  const handleValidateFile = useCallback(async ({ file }: { file: File}) => {
    try {
      setLoading(true);
      setDataFile([]);
      
      const data = new FormData();
      data.append("file", file);
      
      const response = await apiService.post<IReturnedRequest>("/", data);
      
      if(response.data.isSuccess) {
        setDataFile(response.data.data);
        
        let isErrorFile = false;
        response.data.data.map(data => {
          if (data.isError) {
            isErrorFile = true;
          }
        });
        
        if(!isErrorFile) {
          setFileWithoutError(true);
          defaultAlert({ messages:["Validação ralizar com sucesso!"], type: "success", position: "top-end" });
        } else {
          defaultAlert({ messages: ["Existem algumas erros no arquivo escolhido"], type: "warning", position: "top-end" });
        }
        
      } else {
        defaultAlert({ messages: response.data.errors, type: "error", position: "top-end" });
      }

    } catch (error) {
      catchDefalutAlert();
    } finally {
      setLoading(false);
    }
    
  }, []);

  const handleAtualizar = useCallback(async (data: IReturnedRequestFileResultApi[]) => {
    try {
      setLoading(true);
      const response = await apiService.put<IReturnedRequest>("/", { data });
      
      if(response.data.isSuccess) {
        defaultAlert({ messages:["Validação realizar com sucesso!"], type: "success", position: "top-end" });
      } else {
        defaultAlert({ messages: response.data.errors, type: "error", position: "top-end" });
      }

    } catch (error) {
      catchDefalutAlert();

    } finally {
      setLoading(false);
      setFileWithoutError(false);
      setDataFile([]);
    }
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
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height={120}>
                  <LoadingSimple />
                </Box>
              ) :
                !fileWithoutError ?
                  <UploadFile handleValidateFile={handleValidateFile} />
                  :
                  <Button 
                    onClick={() => handleAtualizar(dataFile)}
                    size="large" 
                    variant="contained" 
                    startIcon={<SaveAs />} 
                    sx={{ borderRadius: 3 }}
                  >
                    ATUALIZAR
                  </Button>
              }
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
