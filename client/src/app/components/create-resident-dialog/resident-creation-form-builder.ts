import { CommunicationService } from "@app/services/communication.service";
import { ImmigrationStatus } from "@common/enums/immigration-status.enum";
import { Issue } from "@common/enums/issue.enum";
import { Caregiver } from "@common/interfaces/stakeholders/users";
import { firstValueFrom } from "rxjs";

export class ResidentFormBuilder {
  constructor(private communicationService: CommunicationService) {}

  getImmigrationStatusOptions() {
    return Object.values(ImmigrationStatus).map((status) => ({
      value: status,
      label: status,
    }));
  }

  getIssueOptions() {
    return Object.values(Issue).map((issue) => ({
      value: issue,
      label: issue,
    }));
  }

  //   getSignificantPeopleOptions() {
  //     return Object.values(SignificantPeople).map((person) => ({
  //       value: person,
  //       label: person,
  //     }));
  //   }

  async getCaregiverOptions() {
    const response = await firstValueFrom(
      this.communicationService.getAllCaregivers()
    );
    const caregivers = response.body;
    if (!caregivers) return [];
    return caregivers.map((caregiver: Caregiver) => ({
      value: caregiver.id,
      label: `${caregiver.firstName} ${caregiver.lastName}`,
    }));
  }

  async buildAccountInformationGroup() {
    return {
      props: { label: "Account Information" },
      fieldGroup: [
        {
          key: "email",
          type: "input",
          props: {
            label: "Email",
            required: true,
            type: "email",
          },
        },
        {
          key: "hashedPassword",
          type: "input",
          props: {
            label: "Password",
            required: true,
          },
        },
      ],
    };
  }

  async buildPersonalInformationGroup() {
    return {
      props: { label: "Personal Information" },
      fieldGroup: [
        {
          key: "firstName",
          type: "input",
          props: {
            label: "First Name",
            required: true,
          },
        },
        {
          key: "lastName",
          type: "input",
          props: {
            label: "Last Name",
            required: true,
          },
        },
        {
          key: "birthDate",
          type: "input",
          props: {
            type: "date",
            label: "Birth Date",
            required: true,
          },
        },
        {
          key: "phoneNumber",
          type: "input",
          props: {
            label: "Phone Number",
            required: true,
            type: "tel",
          },
        },
        {
          key: "numberOfChildren",
          type: "input",
          props: {
            type: "number",
            label: "Number of Children",
            required: true,
          },
        },
      ],
    };
  }

  async buildStatusInformationGroup() {
    const immigrationStatusOptions = this.getImmigrationStatusOptions();
    return {
      props: { label: "Status Information" },
      fieldGroup: [
        {
          key: "isIndigenous",
          type: "checkbox",
          props: {
            label: "Is Indigenous",
            formCheck: "inline-switch",
            indeterminate: false,
          },
        },
        {
          key: "isVeteran",
          type: "checkbox",
          props: {
            label: "Is Veteran",
            formCheck: "inline-switch",
            indeterminate: false,
          },
        },
        {
          key: "immigrationStatus",
          type: "select",
          props: {
            label: "Immigration Status",
            required: true,
            options: immigrationStatusOptions,
          },
        },
      ],
    };
  }

  buildSignificantPeopleFieldGroup() {
    return {
      key: "significantPeople",
      type: "repeat", // Ensure you have a custom 'repeat' type defined to handle dynamic arrays
      templateOptions: {
        addText: "Add Significant Person",
        label: "Significant People",
      },
      fieldArray: {
        fieldGroup: [
          {
            key: "number",
            type: "input",
            templateOptions: {
              label: "Number",
              required: true,
              type: "number",
            },
          },
          {
            key: "phone",
            type: "input",
            templateOptions: {
              label: "Phone",
              required: true,
              type: "tel",
            },
          },
        ],
      },
    };
  }

  async buildResidenceInformationGroup() {
    return {
      props: { label: "Residence Information" },
      fieldGroup: [
        {
          key: "currentLodging",
          type: "input",
          props: {
            label: "Current Lodging",
            required: true,
          },
        },
        {
          key: "borough",
          type: "input",
          props: {
            label: "Borough",
            required: true,
          },
        },
        {
          key: "monthlyIncome",
          type: "input",
          props: {
            type: "number",
            label: "Monthly Income",
            required: true,
          },
        },
      ],
    };
  }

  async buildCareInformationGroup() {
    const caregiverOptions = await this.getCaregiverOptions();
    // const significantPeopleOptions = await this.getSignificantPeopleOptions();
    const issueOptions = this.getIssueOptions();

    return {
      props: { label: "Care Information" },
      fieldGroup: [
        {
          key: "caregivers",
          type: "select",
          templateOptions: {
            label: "Caregivers",
            required: true,
            multiple: true,
            options: caregiverOptions,
          },
        },
        {
          key: "issues",
          type: "select",
          templateOptions: {
            label: "Issues",
            required: true,
            multiple: true,
            options: issueOptions,
          },
        },
        // this.buildSignificantPeopleFieldGroup(),
      ],
    };
  }
  async buildForm() {
    const accountInformationGroup = await this.buildAccountInformationGroup();
    const personalInformationGroup = await this.buildPersonalInformationGroup();
    const statusInformationGroup = await this.buildStatusInformationGroup();
    const residenceInformationGroup =
      await this.buildResidenceInformationGroup();
    const careInformationGroup = await this.buildCareInformationGroup();

    return [
      accountInformationGroup,
      personalInformationGroup,
      statusInformationGroup,
      residenceInformationGroup,
      careInformationGroup,
    ];
  }
}
