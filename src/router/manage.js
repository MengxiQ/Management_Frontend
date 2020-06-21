import Emplist from "@/views/manage/Empmanage/EmpList/Emplist";
import EmpOverview from "@/views/manage/Empmanage/EmpOverview";
import AssetOverview from "@/views/manage/AssetsMange/AssetOverview";
import NetEquipList from "@/views/manage/AssetsMange/NetEquipList";
import NetDeviceList from "@/views/manage/AssetsMange/NetDeviceList";
import AssetType from "@/views/manage/AssetsMange/AssetType";
import CabinetList from "@/views/manage/AssetsMange/CabinetList";
export const MangeChildren =[

  {
    path:'emplist',
    name: "Emplist",
    component:Emplist
  },
  {
    path:'EmpOverview',
    name: "EmpOverview",
    component:EmpOverview
  },
  {
    path:'AssetOverview',
    name: "AssetOverview",
    component:AssetOverview
  },
  {
    path:'NetEquipList',
    name: "NetEquipList",
    component:NetEquipList
  },
  {
    path:'NetDeviceList',
    name: "NetDeviceList",
    component:NetDeviceList
  },
  {
    path:'CabinetList',
    name: "CabinetList",
    component:CabinetList
  },
  {
    path:'AssetType',
    name: "AssetType",
    component:AssetType
  }

]