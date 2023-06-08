import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Space } from 'antd';
import React, { useCallback } from 'react';
import ActionCard from './ActionCard';

const ThenItem: React.FC = () => {

    const [actionForm] = Form.useForm();

    const handleOpenAddTypeModal = () => {
        throw new Error("还未实现");
    }
    const handleActionCardCallBack = useCallback(() => {
        throw new Error("还未实现");
    }, [])


    
    return <Form
    name="dynamic_form_nest_item"
    onFinish={(values) => {
        console.log('values', values);
    }}
    form={actionForm}
    style={{ maxWidth: 600 }}
    autoComplete="off"
>
    <Form.List name="users">
        {(fields, { add, remove }) => (
            <>
                {fields.map((item: any, index: number, ...restField) => (
                    <Space key={item.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                            {...restField}
                            name={[item.name, `first`]}
                            rules={[{ required: true, message: 'Missing first name' }]}
                        >
                            <ActionCard key={item.name} handleActionCardCallBack={handleActionCardCallBack} index={index} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(item.name)} />
                    </Space>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => {
                        handleOpenAddTypeModal()
                    }
                    } block icon={<PlusOutlined />}>
                        Add field
                    </Button>
                </Form.Item>
            </>
        )}
    </Form.List>
    <Form.Item>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </Form.Item>
</Form>
 
};

export default ThenItem;