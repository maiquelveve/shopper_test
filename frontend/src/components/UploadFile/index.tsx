import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, Badge, Alert, AlertTitle } from "@mui/material";
import { Backup, DownloadDone } from "@mui/icons-material/";

export const UploadFile: React.FC<IUploadFileProps> = ({ handleValidateFile }) => {
 
  const { getInputProps, getRootProps, acceptedFiles, fileRejections } = useDropzone({ 
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  const acceptedFileItems = acceptedFiles.map(file => ({ file, preview: URL.createObjectURL(file) }))[0];
  const fileRejectionItems = fileRejections.map(({ errors }) => (errors))[0];

  const handleSaveFile = () => {
    acceptedFiles.pop();
    handleValidateFile({ file: acceptedFileItems.file });
  };

  return (
    <>
      <input {...getInputProps()} />
      {(!acceptedFileItems && !fileRejectionItems) &&
        <Button size="large" variant="contained" startIcon={<Backup />} {...getRootProps()} sx={{ borderRadius: 3 }}>
          Adicionar Arquivo
        </Button>
      }
      {acceptedFileItems && 
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Badge 
            {...getRootProps()} 
            sx={{ cursor: "pointer", ml: 2 }}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            badgeContent={"x"} 
            color="error" 
          />
          <Typography sx={{ mx: 2 }}>{acceptedFileItems.file.name}</Typography>
          <Button 
            {...getRootProps()}
            variant="contained" 
            size="large"
            startIcon={<DownloadDone />} 
            sx={{ borderRadius: 3 }}
            onClick={handleSaveFile}
          >
            Validar
          </Button>
        </Box>
      }
      {fileRejectionItems &&
        <Box 
          {...getRootProps()}
          display="flex" 
          flexDirection="column"
          sx={{ cursor: "pointer" }}
        >
          <Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>
            <AlertTitle>Tipo Arquivo invalido</AlertTitle>
            <Box display="flex" flexDirection="column">
              {/* Extensão permitida — <strong>CSV</strong> */}
              <Typography variant="caption" mx={1}>Extensão permitida <strong>CSV</strong>. Escolha outro arquivo AQUI!</Typography>
            </Box>
          </Alert>
        </Box>
      }
    </>
  );
};
