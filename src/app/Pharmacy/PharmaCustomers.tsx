import React from 'react'
import OneHealthServiceSuits from '@/components/OneHealthServiceSuits'
import { PhamaCustomerData } from './data';
export default function PharmaCustomers() {
  return (
		<OneHealthServiceSuits
			tag="REACH NEW PHARMA CUSTOMERS"
			headingText="Dispense 3X more pharmacy orders & 10x revenue."
			subHeadingText="Deliver more medications and make more prescription sales with OneHealth pharmacy provider portal. Easily receive orders, manage enrollee repeat medications & drive positive health experience."
			containsNoStyles={false}
			serviceCollections={PhamaCustomerData}
			sectionHeaderCls='px-4 md:px-0'
		/>
	);
}
