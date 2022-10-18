import icon_data_01 from '@/assets/icons/icon_data_01.png';
import icon_menu_01 from '@/assets/icons/icon_menu_01.png';
import icon_menu_02 from '@/assets/icons/icon_menu_02.png';
import icon_menu_03 from '@/assets/icons/icon_menu_03.png';
import icon_menu_04 from '@/assets/icons/icon_menu_04.png';
import icon_menu_05 from '@/assets/icons/icon_menu_05.png';
import icon_menu_06 from '@/assets/icons/icon_menu_06.png';
import icon_menu_07 from '@/assets/icons/icon_menu_07.png';
import icon_menu_09 from '@/assets/icons/icon_menu_09.png';
import icon_menu_10 from '@/assets/icons/icon_menu_10.png';
import icon_menu_12 from '@/assets/icons/icon_menu_12.png';
import icon_menu_14 from '@/assets/icons/icon_menu_14.png';
import icon_menu_15 from '@/assets/icons/icon_menu_15.png';

import '../global.less';

export const ICON_OPTION = [
  {
    label: (
      <>
        <img src={icon_menu_15} alt="" className="iconStyle" />
        icon_system
      </>
    ),
    value: 'icon_system',
  },
  {
    label: (
      <>
        <img src={icon_menu_14} alt="" className="iconStyle" />
        icon_ithings
      </>
    ),
    value: 'icon_ithings',
  },
  {
    label: (
      <>
        <img src={icon_menu_12} alt="" className="iconStyle" />
        icon_cloud_monitor
      </>
    ),
    value: 'icon_cloud_monitor',
  },
  {
    label: (
      <>
        <img src={icon_menu_10} alt="" className="iconStyle" />
        icon_dosing
      </>
    ),
    value: 'icon_dosing',
  },
  {
    label: (
      <>
        <img src={icon_menu_09} alt="" className="iconStyle" />
        icon_device
      </>
    ),
    value: 'icon_device',
  },
  {
    label: (
      <>
        <img src={icon_menu_07} alt="" className="iconStyle" />
        icon_feedwater
      </>
    ),
    value: 'icon_feedwater',
  },
  {
    label: (
      <>
        <img src={icon_menu_06} alt="" className="iconStyle" />
        icon_ecosystem
      </>
    ),
    value: 'icon_ecosystem',
  },
  {
    label: (
      <>
        <img src={icon_menu_05} alt="" className="iconStyle" />
        icon_sewage
      </>
    ),
    value: 'icon_sewage',
  },
  {
    label: (
      <>
        <img src={icon_menu_04} alt="" className="iconStyle" />
        icon_electric
      </>
    ),
    value: 'icon_electric',
  },
  {
    label: (
      <>
        <img src={icon_menu_03} alt="" className="iconStyle" />
        icon_heat
      </>
    ),
    value: 'icon_heat',
  },
  {
    label: (
      <>
        <img src={icon_menu_02} alt="" className="iconStyle" />
        icon_ap
      </>
    ),
    value: 'icon_ap',
  },
  {
    label: (
      <>
        <img src={icon_menu_01} alt="" className="iconStyle" />
        icon_hvac
      </>
    ),
    value: 'icon_hvac',
  },
  {
    label: (
      <>
        <img src={icon_data_01} alt="" className="iconStyle" />
        icon_data_01
      </>
    ),
    value: 'icon_data_01',
  },
];

export const IconMap = {
  icon_data_01: icon_data_01,
  icon_hvac: icon_menu_01,
  icon_ap: icon_menu_02,
  icon_heat: icon_menu_03,
  icon_electric: icon_menu_04,
  icon_sewage: icon_menu_05,
  icon_ecosystem: icon_menu_06,
  icon_feedwater: icon_menu_07,
  icon_device: icon_menu_09,
  icon_dosing: icon_menu_10,
  icon_cloud_monitor: icon_menu_12,
  icon_ithings: icon_menu_14,
  icon_system: icon_menu_15,
};
