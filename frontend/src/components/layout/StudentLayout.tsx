import React from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline, Grid, Paper } from '@mui/material';
import ConversationPanel from '../panels/ConversationPanel';
import SourcesPanel from '../panels/SourcesPanel';
import StudioPanel from '../panels/StudioPanel';

const drawerWidth = 240;
const studioWidth = 320;

const StudentLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hannah - AI Learning Assistant
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Panel (Sources) */}
      <Paper
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          mt: '64px', // AppBar height
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider'
        }}
        elevation={0}
      >
        <SourcesPanel />
      </Paper>

      {/* Main Content (Conversation) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px', // AppBar height
          height: 'calc(100vh - 64px)',
        }}
      >
        <ConversationPanel />
      </Box>

      {/* Right Panel (Studio) */}
      <Paper
        sx={{
          width: studioWidth,
          flexShrink: 0,
          mt: '64px', // AppBar height
          bgcolor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider'
        }}
        elevation={0}
      >
        <StudioPanel />
      </Paper>
    </Box>
  );
};

export default StudentLayout;
