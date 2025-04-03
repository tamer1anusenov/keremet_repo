import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

interface MedicalCondition {
  id: string;
  name: string;
  diagnosisDate: string;
  status: 'active' | 'chronic' | 'resolved';
  treatment: string;
  notes: string;
}

const MedicalRecord: React.FC = () => {
  const [conditions, setConditions] = useState<MedicalCondition[]>([
    {
      id: '1',
      name: 'Гипертония',
      diagnosisDate: '2023-01-15',
      status: 'chronic',
      treatment: 'Прием антигипертензивных препаратов',
      notes: 'Контроль давления 2 раза в день',
    },
    {
      id: '2',
      name: 'ОРВИ',
      diagnosisDate: '2023-03-20',
      status: 'resolved',
      treatment: 'Симптоматическое лечение',
      notes: 'Выздоровление через 7 дней',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newCondition, setNewCondition] = useState<Partial<MedicalCondition>>({
    name: '',
    diagnosisDate: '',
    status: 'active',
    treatment: '',
    notes: '',
  });

  const handleAddCondition = () => {
    if (newCondition.name && newCondition.diagnosisDate) {
      setConditions([
        ...conditions,
        {
          id: Date.now().toString(),
          name: newCondition.name,
          diagnosisDate: newCondition.diagnosisDate,
          status: newCondition.status as 'active' | 'chronic' | 'resolved',
          treatment: newCondition.treatment || '',
          notes: newCondition.notes || '',
        },
      ]);
      setOpenDialog(false);
      setNewCondition({
        name: '',
        diagnosisDate: '',
        status: 'active',
        treatment: '',
        notes: '',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'error';
      case 'chronic':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Острое';
      case 'chronic':
        return 'Хроническое';
      case 'resolved':
        return 'Вылечено';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Медицинская карта
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          История заболеваний
        </Typography>
        <List>
          {conditions.map((condition) => (
            <ListItem key={condition.id}>
              <ListItemText
                primary={condition.name}
                secondary={`Диагностировано: ${condition.diagnosisDate}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MedicalRecord; 