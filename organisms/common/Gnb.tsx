import { Logout } from "@mui/icons-material";
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import useKakaoValid from "hooks/useKakaoValid";
import { useScroll } from "hooks/useScroll";

const Nav = styled('nav')((props) => (
  {
    maxWidth: '1240px',
    marginLeft: '0',
    [props.theme.breakpoints.up(1240)]: {
      marginLeft: 'calc(50vw - 620px)',
    }
  }
));

export default function Gnb() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const { userData, isValid } = useKakaoValid();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isLogined, setIsLogined] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function onClickLogout() {
    ['id', 'nickname', 'profile_image', 'access_token', 'thumbnail_image'].forEach((e: string) => localStorage.removeItem(e));
    setIsLogined(false);
    router.reload();
  }

  useEffect(() => {
    if (isValid) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [isValid]);

  return <Nav
    className='flex md:py-4 xl:px-0 xs:p-4 p-4 justify-between items-end bg-white fixed top-0 left-0 w-screen z-10'
    style={{
      borderBottom: ((scrollY >= 30)) ? '1px solid #e5e7eb' : '1px solid transparent',
      transition: 'border-bottom ease 0.5s'
    }}>
    <Link href={'/'}>
      <div className='flex items-end justify-between'>
        <p className='text-3xl' style={{ fontWeight: 700 }}>stein</p>
        {/* <Image style={{ margin: '0 0px 4px 8px', }} src={'/stein-logo.svg'} alt={'logo'} width={24} height={24}></Image> */}
      </div>
    </Link>
    {isLogined
      ?
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          sx={{ width: 36, height: 36, border: '1px solid gray' }}
          src={localStorage.getItem('thumbnail_image')!}
        >
          {localStorage.getItem('nickname') !== null && localStorage.getItem('nickname')![0]}
        </Avatar>
      </IconButton> :
      <Button style={{ height: 36 }}
        color='primary'
        variant='outlined'
        onClick={() => { router.push('/login'); }}>
        Login
      </Button>
    }
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {userData.id === 2651014525 &&
        [{ icon: <SignalCellularAltRoundedIcon fontSize="small" />, title: 'Google Anaylytics', link: "https://analytics.google.com/analytics/web/#/p353329117/reports/intelligenthome" },
        { icon: <DataUsageIcon fontSize="small" />, title: 'Google Search', link: "https://search.google.com/search-console?resource_id=https%3A%2F%2Fblog.steinjun.net%2F" }
        ].map((e, i) => {
          return <MenuItem key={i} onClick={() => {
            window.open(e.link, '_blank');
            handleClose();
          }}>
            <ListItemIcon>
              {e.icon}
            </ListItemIcon>
            {e.title}
          </MenuItem>;
        })
      }

      {userData.id === 2651014525 &&
        <hr></hr>
      }
      <MenuItem onClick={() => {
        handleClose();
        onClickLogout();
      }}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  </Nav >;
}