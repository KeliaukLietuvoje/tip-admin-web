import { ArrayHelpers, FieldArray } from "formik";
import { isEmpty } from "lodash";
import styled from "styled-components";
import SelectField from "../../../components/fields/SelectField";
import SimpleButton from "../../../components/fields/SimpleButton";
import TreeSelectField from "../../../components/fields/TreeSelect";
import Icon from "../../../components/other/Icons";
import { device } from "../../../styles";
import { Group, MapAppsProps } from "../../../types";
import { UserFormProps } from "../pages/UserForm";
import {
  getInheritedApps,
  handleAddApps,
  handleRemoveApps
} from "../utils/apps";
import { getUserRoleOptions } from "../utils/options";
import { inputLabels, roleLabels } from "../utils/texts";

interface GroupContainerProps {
  handleChange: (field: string, value: any, shouldValidate?: boolean) => void;
  arrayHelpers?: ArrayHelpers;
  values: UserFormProps;
  groupOptions: Group[];
  errors: UserFormProps;
  user: UserFormProps | undefined;
}

const GroupsContainer = ({
  handleChange,
  values,
  groupOptions,
  errors,
  user
}: GroupContainerProps) => {
  const roles = getUserRoleOptions();

  const handleChangeGroup = (e: { id: string }, index: number) => {
    handleChange(`groups.${index}.id`, e.id);

    const groupId = values.groups?.[index]?.id;

    if (!groupId) {
      return handleChange(
        "apps",
        handleAddApps({
          apps: [...values.apps] as MapAppsProps[],
          newApps: getInheritedApps(groupOptions, e.id),
          user
        })
      );
    }

    handleChange(
      "apps",
      handleAddApps({
        apps: [
          ...handleRemoveApps({
            apps: values.apps as MapAppsProps[],
            groupId: groupId,
            groupOptions
          })
        ],
        newApps: getInheritedApps(groupOptions, e.id),
        user
      })
    );
  };

  const handleDeleteApps = (index) => {
    handleChange(
      "apps",
      handleRemoveApps({
        apps: values.apps as MapAppsProps[],
        groupId: values?.groups?.[index]?.id,
        groupOptions
      })
    );
  };

  return (
    <FieldArray
      name="groups"
      render={(arrayHelpers) => (
        <div>
          {values.groups?.map((item, index: number) => {
            const groupError = errors?.groups?.[index];
            const showDeleteIcon =
              !isEmpty(values?.groups) && values?.groups?.length > 1;
            return (
              <FormRow
                showDeleteIcon={showDeleteIcon}
                key={`group-row-${index}`}
              >
                <TreeSelectField
                  label={inputLabels.group}
                  name={`groups.${index}.id`}
                  groups={values?.groups}
                  error={groupError?.id}
                  showError={false}
                  groupOptions={groupOptions}
                  value={item?.id}
                  onChange={(e) => {
                    handleChangeGroup(e, index);
                  }}
                />
                <SelectField
                  options={roles}
                  label={inputLabels.role}
                  name={`groups.${index}.role`}
                  error={groupError?.role}
                  showError={false}
                  value={item.role}
                  onChange={(role) =>
                    handleChange(`groups.${index}.role`, role)
                  }
                  getOptionLabel={(role) => roleLabels[role]}
                />
                {showDeleteIcon && (
                  <DeleteButton
                    onClick={() => {
                      arrayHelpers.remove(index);
                      handleDeleteApps(index);
                    }}
                  >
                    <DeleteIcon name={"delete"} />
                  </DeleteButton>
                )}
              </FormRow>
            );
          })}
          <SimpleButton
            type="button"
            onClick={() => {
              arrayHelpers.push({
                id: "",
                role: ""
              });
            }}
          >
            + Pridėti naują
          </SimpleButton>
        </div>
      )}
    />
  );
};

const DeleteButton = styled.div`
  margin-top: auto;
  height: 40px;
  display: flex;
  @media ${device.mobileL} {
    margin-bottom: 0px;
    height: auto;
  }
`;

const FormRow = styled.div<{ showDeleteIcon?: boolean }>`
  display: grid;
  margin-top: 16px;
  grid-template-columns: 1fr 1fr ${({ showDeleteIcon }) =>
      showDeleteIcon ? "40px" : ""};
  gap: 16px;
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const DeleteIcon = styled(Icon)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.error};
  font-size: 2.4rem;
  margin: auto 0 auto 16px;
  @media ${device.mobileL} {
    margin: 8px 0 16px 0;
  }
`;

export default GroupsContainer;
