import {
  download, cash, gitCompare,
  syncSharp, paperPlaneOutline, businessOutline,
  cloudDownloadOutline, cloudUploadOutline, documentsOutline
} from 'ionicons/icons';

export const buttonsData = [
  {
    buttonText: "Deposit",
    iconName: download,
  },
  {
    buttonText: "Withdraw",
    iconName: cash,
  },
  {
    buttonText: "Transfer",
    iconName: gitCompare,
  },
];

export const linksData = [
  {
    linkText: "Auto-deposits",
    linkSubText: "Set up or manage your recurring deposits",
    iconName: syncSharp,
  },
  {
    linkText: "Send or request",
    linkSubText: "Send or request money from a Wealthsimple contact",
    iconName: paperPlaneOutline,
  },
  {
    linkText: "Transfer from another institution",
    linkSubText: "Move assets or investment accounts",
    iconName: businessOutline,
  },
  {
    linkText: "Receive crypto",
    linkSubText: "Receive crypto from another wallet",
    iconName: cloudDownloadOutline,
  },
  {
    linkText: "Send crypto",
    linkSubText: "Send crypto to another wallet",
    iconName: cloudUploadOutline,
  },
  {
    linkText: "Linked accounts",
    linkSubText: "Add or remove a linked bank account or debit card",
    iconName: documentsOutline,
  },
];